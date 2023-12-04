import { config } from './config.server'
import chalk from 'chalk'

const prefix = chalk.bgCyan('[AUTH0] ')

/**
 * Creates a function that fetches the OpenID configuration.
 * @return {Function} A function that fetches the OpenID configuration.
 */
const createOpenIDConfigFetcher = () => {
  // keep the cache in the closure
  let cache: Record<string, unknown> | null = null

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
        throw new Error('Failed to fetch OIDC config')
      }

      // unpack
      cache = await res.json()

      // return config object
      return cache
    } catch (error) {
      console.log(prefix, `Failed to fetch config from ${url}`)
      throw error
    }
  }
}

export const getOpenIDConfig = createOpenIDConfigFetcher()
