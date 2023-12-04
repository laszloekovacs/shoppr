import yup from 'yup'
import chalk from 'chalk'
import { getEnv } from './environment.server'
import { isWebKeySetSchema, webKeySetSchema } from './webkeyset.server'
const prefix = chalk.bgCyan('[api/auth] ')
import jwt from 'jsonwebtoken'

const configSchema = yup.object({
  authorization_endpoint: yup.string().url().required(),
  token_endpoint: yup.string().url().required(),
  id_token_signing_alg_values_supported: yup
    .array(yup.string().required())
    .required(),
  jwks_uri: yup.string().url().required(),
  userinfo_endpoint: yup.string().url().required(),
  token_endpoint_auth_signing_alg_values_supported: yup
    .array(yup.string().required())
    .required(),
})

export type OpenIDConfig = yup.InferType<typeof configSchema>

/**
 * Checks if the given data is a valid OpenIdConfig object.
 *
 * @param {any} data - The data to be checked.
 * @return {boolean} Returns true if the data is a valid OpenIdConfig object, otherwise false.
 */
const isOpenIDConfig = (data: any): data is OpenIDConfig => {
  return configSchema.isValidSync(data)
}

/**
 * Creates a function that fetches the OpenID configuration.
 * @return {Function} A function that fetches the OpenID configuration.
 */
const createOpenIDConfigFetcher = () => {
  // keep the cache in the closure
  let cache: OpenIDConfig | null = null

  // create the endpoint url
  const url = `https://${getEnv(
    'AUTH0_DOMAIN'
  )}/.well-known/openid-configuration`

  return async () => {
    // use cache if available, the endpoints wont change a lot
    if (cache) {
      console.log(prefix + 'Using cached config')
      return cache
    }

    // fetch the config
    const res = await fetch(url)

    if (!res.ok) {
      throw new Error(
        `${prefix} Failed to fetch OIDC config: ${res.statusText}`
      )
    }

    // unpack
    const data = await res.json()

    // if the config is valid, cache and return, orherwise throw
    if (isOpenIDConfig(data)) {
      cache = data
      return cache
    } else {
      throw new Error(prefix + 'Invalid OpenID Connect config')
    }
  }
}

export const getOpenIDConfig = createOpenIDConfigFetcher()

/**
 * Retrieves the OpenID public key.
 *
 * @return {Promise<string>} The public key as a string.
 * @throws {Error} If the fetch fails or the public key is invalid.
 */
export const getOpenIDPublicKeys = async () => {
  const config = await getOpenIDConfig()
  const res = await fetch(config.jwks_uri)

  /* fetch failed */
  if (!res.ok) {
    throw new Error(`${prefix} Failed to fetch public key: ${res.statusText}`)
  }

  const data = await res.json()

  /* the result should be an array of key objects */
  if (!isWebKeySetSchema(data)) {
    throw new Error(`${prefix} Invalid public key`)
  }

  return data
}

export const verifyOpenIDToken = async (token: string) => {
  const configPromise = getOpenIDConfig()
  const publickeysPromise = getOpenIDPublicKeys()

  /* get the config and public key independently */
  const [config, publickeys] = await Promise.all([
    configPromise,
    publickeysPromise,
  ])

  /* peak into the token */
  const decoded_token = jwt.decode(token)

  if (!decoded_token) {
    throw new Error(`${prefix} Failed to decode token`)
  }
}

/* verify the token token.kid == publickey.kid */
