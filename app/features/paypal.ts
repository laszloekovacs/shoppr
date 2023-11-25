import 'dotenv/config'
import axios from 'axios'
import chalk from 'chalk'
import createLogger from './logger'
import assert from 'assert'

const logOk = createLogger('paypal', chalk.cyan, chalk.bgCyan)
const logError = createLogger('paypal', chalk.red, chalk.bgRed)

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_ENDPOINT } = process.env

/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
export const getAccessToken = async () => {
  try {
    assert(PAYPAL_CLIENT_SECRET, 'Missing PAYPAL_CLIENT_SECRET')
    assert(PAYPAL_CLIENT_ID, 'Missing PAYPAL_CLIENT_ID')
    assert(PAYPAL_ENDPOINT, 'Missing PAYPAL_ENDPOINT')

    const credentials = Buffer.from(
      `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`,
      'utf-8'
    ).toString('base64')

    const res = await axios.post(
      `${PAYPAL_ENDPOINT}/v1/oauth2/token`,
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${credentials}`,
        },
      }
    )

    logError(res.data.access_token)
    return res.data.access_token
  } catch (error) {
    logError(error)
  }
}
