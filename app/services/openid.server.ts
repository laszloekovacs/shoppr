import { config } from './config.server'
import chalk from 'chalk'

const prefix = chalk.bgCyan('[api/auth] ')

export type OpenIdConfig = {
  authorization_endpoint: string
  token_endpoint: string
  jwks_uri: string
  userinfo_endpoint: string
}

/**
 * Checks if the given data is a valid OpenIdConfig object.
 *
 * @param {any} data - The data to be checked.
 * @return {boolean} Returns true if the data is a valid OpenIdConfig object, otherwise false.
 */
const isOpenIdConfig = (data: any): data is OpenIdConfig => {
  // is an object
  if (typeof data !== 'object') {
    return false
  }

  // endpoints are valid urls
  try {
    new URL(data.authorization_endpoint)
    new URL(data.token_endpoint)
    new URL(data.jwks_uri)
    new URL(data.userinfo_endpoint)
  } catch {
    return false
  }

  return true
}

/**
 * Creates a function that fetches the OpenID configuration.
 * @return {Function} A function that fetches the OpenID configuration.
 */
const createOpenIDConfigFetcher = () => {
  // keep the cache in the closure
  let cache: OpenIdConfig | null = null

  // create the endpoint url
  const url = `https://${config.AUTH0_DOMAIN}/.well-known/openid-configuration`

  return async () => {
    // use cache if available, the endpoints wont change a lot
    if (cache) {
      console.log(prefix, 'Using cached config')
      return cache
    }

    try {
      // fetch the config
      const res = await fetch(url)

      if (!res.ok) {
        throw new Error(`Failed to fetch OIDC config: ${res.statusText}`)
      }

      // unpack
      const data = await res.json()

      // if the config is valid, cache and return, orherwise throw
      if (isOpenIdConfig(data)) {
        cache = data
        return cache
      }

      throw new Error('Invalid OpenID Connect config')
    } catch (error) {
      console.log(prefix, `Failed to fetch config from ${url}`)
      throw error
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
export const getOpenIDPublicKey = async () => {
  const config = await getOpenIDConfig()
  const res = await fetch(config.jwks_uri)
  const data = await res.json()

  /* fetch failed */
  if (!res.ok) {
    throw new Error(`${prefix} Failed to fetch public key: ${res.statusText}`)
  }

  /* check if the public key is a string */
  if (typeof data === 'string') {
    return data
  } else {
    throw new Error(`${prefix} Possibly invalid public key: ${data}`)
  }
}

export const verifyIdToken = async (token: string) => {
  const config = await getOpenIDConfig()

  // get the public key from endpoint
  const publickey = await getOpenIDPublicKey()

  // get the supported algorithms
  //
}
