import { ActionFunctionArgs } from '@remix-run/node'
import Stripe from 'stripe'
import { constants } from '~/services/constants.server'
import { stripe } from '~/services/stripe.server'

export const action = async ({ request }: ActionFunctionArgs) => {
	const data = await request.text()
	const signature = request.headers.get('stripe-signature') as string

	const event = stripe.webhooks.constructEvent(
		data,
		signature,
		constants.STRIPE_WEBHOOK_KEY!
	)

	if (event.type === 'checkout.session.completed') {
		const session = event.data.object as Stripe.Checkout.Session
		console.log(session)
	}

	return new Response('OK', { status: 200 })
}
