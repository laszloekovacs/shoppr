import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export const loader = () => {
	const clientId = process.env.PAYPAL_CLIENT_ID as string

	return json({ clientId })
}

const PayoutPage = () => {
	const { clientId } = useLoaderData<typeof loader>()

	return (
		<PayPalScriptProvider
			options={{ clientId: clientId, currency: 'HUF', intent: 'capture' }}
		>
			<PayPalButtons style={{ layout: 'vertical' }} />
		</PayPalScriptProvider>
	)
}

export default PayoutPage
