import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

const PayoutPage = () => {
	return (
		<PayPalScriptProvider
			options={{ clientId: 'test', currency: 'USD', intent: 'capture' }}
		>
			<PayPalButtons style={{ layout: 'vertical' }} />
		</PayPalScriptProvider>
	)
}

export default PayoutPage
