import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node'
import { constants } from '~/services/constants.server'
import { stripe } from '~/services/stripe.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const params = new URL(request.url).searchParams
	const session_id = params.get('session_id') as string

	if (!session_id) {
		throw new Error('session_id is required')
	}

	const session = await stripe.checkout.sessions.retrieve(session_id!)

	if (!session) {
		throw new Error('session not found')
	}

	return json({
		status: session.status,
		customerEmail: session.customer_email
	})
}

export const action = async ({ request }: ActionFunctionArgs) => {
	const session = await stripe.checkout.sessions.create({
		line_items: [
			{
				price_data: {
					currency: 'huf',
					product_data: {
						name: 'Shoppr'
					},
					unit_amount: 100000
				},
				adjustable_quantity: {
					enabled: true,
					minimum: 1,
					maximum: 10
				},
				quantity: 1
			}
		],
		shipping_address_collection: {
			allowed_countries: ['HU']
		},
		mode: 'payment',
		ui_mode: 'embedded',
		return_url: `${constants.SHOPPR_DOMAIN}/stripe/return?session_id={CHECKOUT_SESSION_ID}`
	})

	return json({ clientSecret: session.client_secret })
}
