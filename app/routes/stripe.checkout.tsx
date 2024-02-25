import { useEffect, useRef, useState } from 'react'

import { Stripe, loadStripe } from '@stripe/stripe-js'
import { constants } from '~/services/constants.server'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import {
	EmbeddedCheckout,
	EmbeddedCheckoutProvider
} from '@stripe/react-stripe-js'

export const loader = async () => {
	return json({ stripePublicKey: constants.STRIPE_PUBLISHABLE_KEY! })
}

export default function CheckoutForm() {
	const { stripePublicKey } = useLoaderData<typeof loader>()
	const stripePromiseRef = useRef<Promise<Stripe | null> | null>(null)

	stripePromiseRef.current = loadStripe(stripePublicKey)

	const [clientSecret, setClientSecret] = useState('')

	useEffect(() => {
		fetch('/api/stripe', {
			method: 'POST'
		})
			.then(res => res.json())
			.then(data => {
				setClientSecret(data.clientSecret)
			})
	}, [])

	return (
		<div>
			{stripePromiseRef.current && clientSecret && (
				<EmbeddedCheckoutProvider
					stripe={stripePromiseRef.current}
					options={{ clientSecret }}>
					<EmbeddedCheckout />
				</EmbeddedCheckoutProvider>
			)}
		</div>
	)
}
