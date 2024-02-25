import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useEffect, useState } from 'react'

type Props = {
	clientSecret: string
}

export default function CheckoutForm({ clientSecret }: Props) {
	const stripe = useStripe()
	const elements = useElements()

	const [message, setMessage] = useState('')
	const [isLoading, setLoading] = useState(false)

	useEffect(() => {
		if (!clientSecret || !stripe) {
			return
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			if (!paymentIntent) throw new Error('Failed to load payment intent')

			switch (paymentIntent.status) {
				case 'requires_payment_method':
					setMessage('')
					break
				case 'requires_action':
					setMessage('please complete the payment')
					break

				case 'succeeded':
					setMessage('Payment succeeded!')
					break
				case 'processing':
					setMessage('Your payment is processing.')
					break
				default:
					setMessage('Something went wrong.')
					break
			}
		})
	}, [stripe, clientSecret])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!stripe || !elements) {
			return
		}

		setLoading(true)

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				// payment completeon page
				return_url: 'http://localhost:3000'
			}
		})
		if (error.type === 'card_error' || error.type === 'validation_error') {
			setMessage(error.message || 'An unexpected error occurred.')
		} else {
			setMessage('An unexpected error occurred.')
		}
		setLoading(false)
	}

	return (
		<form id='payment-form' onSubmit={handleSubmit}>
			<PaymentElement id='payment-element' options={{ layout: 'tabs' }} />

			<button disabled={isLoading || !stripe || !elements} id='submit'>
				<span>
					{isLoading ? <div className='spinner' id='spinner'></div> : 'Pay now'}
				</span>
			</button>
			{message && <div id='payment-message'>{message}</div>}
		</form>
	)
}
