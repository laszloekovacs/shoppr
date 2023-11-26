import 'dotenv/config'
import chalk from 'chalk'
import createLogger from './logger'
import assert from 'assert'

const logOk = createLogger('paypal', chalk.cyan, chalk.bgCyan)
const logError = createLogger('paypal', chalk.red, chalk.bgRed)

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_ENDPOINT } = process.env
assert(PAYPAL_CLIENT_SECRET, 'Missing PAYPAL_CLIENT_SECRET')
assert(PAYPAL_CLIENT_ID, 'Missing PAYPAL_CLIENT_ID')
assert(PAYPAL_ENDPOINT, 'Missing PAYPAL_ENDPOINT')

/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
export const getAccessToken = async () => {
  try {
    const credentials = Buffer.from(
      `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`,
      'utf-8'
    ).toString('base64')

    const res = await fetch(`${PAYPAL_ENDPOINT}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${credentials}`,
      },
      body: 'grant_type=client_credentials',
    })

    const data = await res.json()

    return data.access_token
  } catch (error) {
    logError(error)
  }
}

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
const createOrder = async (cart: string) => {
  try {
    logOk('Creating order ' + JSON.stringify(cart))

    const token = await getAccessToken()
    const url = `${PAYPAL_ENDPOINT}/v2/checkout/orders`
    const payload = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'HUF',
            value: '500.00',
          },
        },
      ],
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json()
    return data
  } catch (error) {
    logError(error)
  }
}

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (cart: string) => {
  try {
    const token = await getAccessToken()
    const url = `${PAYPAL_ENDPOINT}/v2/checkout/orders/${cart}/capture`

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await res.json()
    return data
  } catch (error) {
    logError(error)
  }
}
