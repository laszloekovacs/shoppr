import chalk from 'chalk'
import 'dotenv/config'

const prefix = '[Environment] '

export type tokens =
  | 'AUTH0_CLIENT_SECRET'
  | 'AUTH0_CLIENT_ID'
  | 'AUTH0_DOMAIN'
  | 'AUTH0_REDIRECT_URI'
  | 'PAYPAL_CLIENT_ID'
  | 'TEST_VALUE_UNDEFINED'

export const getEnv = (key: tokens) => {
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
