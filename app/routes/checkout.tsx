import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Stripe from 'stripe'
import { constants } from '~/services/constants.server'

import CheckoutForm from '~/components/checkoutform'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY } = constants

	const stripe = new Stripe(STRIPE_SECRET_KEY!)

	const paymentIntent = await stripe.paymentIntents.create({
		amount: 40000,
		currency: 'huf'
	})

	return json({ paymentIntent, STRIPE_PUBLISHABLE_KEY })
}

export default function CheckoutPage() {
	const { paymentIntent, STRIPE_PUBLISHABLE_KEY } =
		useLoaderData<typeof loader>()

	const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY!)

	return (
		<Elements
			stripe={stripePromise}
			options={{ clientSecret: paymentIntent.client_secret! }}>
			<CheckoutForm clientSecret={paymentIntent.client_secret!} />
		</Elements>
	)
}

export const action = () => {
	return null
}
