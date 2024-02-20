import { ActionFunctionArgs, json, redirect } from '@remix-run/node'
import chalk from 'chalk'

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env
const base = 'https://api-m.sandbox.paypal.com'

const createOrder = async (body: any) => {
	const accessToken = await generatePayPalAccessToken()
	const url = `${base}/v2/checkout/orders`

	const payload = {
		intent: 'CAPTURE',
		purchase_units: [
			{
				amount: {
					currency_code: 'HUF',
					value: '100.00',
				},
			},
		],
	}

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(payload),
	})

	if (!response.ok) {
		throw new Error('failed to create order')
	}

	const jsonResponse = await response.json()

	return json({ id: jsonResponse.id, status: jsonResponse.status })
}

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (body?: any) => {
	const accessToken = await generatePayPalAccessToken()
	const url = `${base}/v2/checkout/orders/${body.orderId}/capture`

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	})

	if (!response.ok) {
		console.error(chalk.red(response.statusText))
		throw new Error('failed to capture order')
	}

	return response.json()
}

export const action = async ({ request }: ActionFunctionArgs) => {
	const body = await request.json()

	switch (body.intent) {
		case 'CREATE_ORDER':
			return createOrder(body)

		case 'CAPTURE_ORDER':
			return captureOrder(body)

		default:
			throw new Error('Invalid intent ' + body.intent)
	}
}

/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */

const generatePayPalAccessToken = async () => {
	if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
		throw new Error('Missing paypal credentials')
	}

	const auth = Buffer.from(
		PAYPAL_CLIENT_ID + ':' + PAYPAL_CLIENT_SECRET
	).toString('base64')

	const response = await fetch(`${base}/v1/oauth2/token`, {
		method: 'POST',
		body: 'grant_type=client_credentials',
		headers: {
			Authorization: `Basic ${auth}`,
		},
	})

	const data: { access_token: string } = await response.json()

	return data.access_token
}

export const loader = async () => {
	return redirect('/')
}
