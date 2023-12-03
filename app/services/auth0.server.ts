import 'dotenv/config'

export const getOIDCConfig = async () => {
  assert(process.env.AUTH0_DOMAIN)

  // create the endpoint url
  const url = `https://${process.env.AUTH0_DOMAIN}/.well-known/openid-configuration`

  // fetch the config
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Failed to fetch OIDC config')
  }

  // unpack
  const data = await res.json()

  // return config object
  return data
}
