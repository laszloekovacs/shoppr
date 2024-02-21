import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Stripe from 'stripe'
import {
	StripeExpressCheckoutElementConfirmEvent,
	loadStripe,
} from '@stripe/stripe-js'
import {
	AddressElement,
	Elements,
	ExpressCheckoutElement,
	PaymentElement,
} from '@stripe/react-stripe-js'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const { STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY } = process.env
	const stripe = new Stripe(STRIPE_SECRET_KEY!)

	if (!STRIPE_SECRET_KEY || !STRIPE_PUBLISHABLE_KEY) {
		throw new Error('Missing STRIPE_SECRET_KEY')
	}

	const paymentIntent = await stripe.paymentIntents.create({
		amount: 40000,
		currency: 'huf',
	})

	return json({ paymentIntent, publishableKey: STRIPE_PUBLISHABLE_KEY })
}

export default function StripeCheckout() {
	const { paymentIntent, publishableKey } = useLoaderData<typeof loader>()

	// move this to a context
	const stripePromise = loadStripe(publishableKey)

	return (
		<div>
			<h1>Stripe Checkout</h1>

			<Elements
				stripe={stripePromise}
				options={{
					clientSecret: paymentIntent.client_secret!,
					appearance: {
						theme: 'flat',
					},
				}}
			>
				<form>
					<ExpressCheckoutElement
						onConfirm={function (
							event: StripeExpressCheckoutElementConfirmEvent
						) {
							throw new Error('Function not implemented.')
						}}
					/>
					<AddressElement options={{ mode: 'shipping' }} />
					<PaymentElement />
				</form>
			</Elements>
		</div>
	)
}
