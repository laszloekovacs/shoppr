import chalk from 'chalk'
import 'dotenv/config'

const prefix = '[Environment] '

export type key =
  | 'AUTH0_CLIENT_SECRET'
  | 'AUTH0_CLIENT_ID'
  | 'AUTH0_DOMAIN'
  | 'AUTH0_REDIRECT_URI'
  | 'PAYPAL_CLIENT_ID'
  | 'TEST_VALUE_UNDEFINED'

/**
 * Safely retrieves the value of the specified environment variable.
 *
 * @param {key} key - The key of the environment variable to retrieve.
 * @throws {Error} Throws an error if the process is undefined or if the environment variable is missing or empty.
 * @return {string} The value of the specified environment variable.
 */
export const getEnv = (key: key) => {
  if (process === undefined) {
    throw new Error(
      `${prefix} process env undefined: are you calling from node?`
    )
  }

  const value = process.env[key]

  if (!value || value === '') {
    throw new Error(`${prefix} Missing environment variable ${key}`)
  }
  return value
}
