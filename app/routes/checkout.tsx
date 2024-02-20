import {
	CreateOrderActions,
	CreateOrderData,
	OnApproveActions,
	OnApproveData,
} from '@paypal/paypal-js'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { documents } from '~/services/db.server'
import { authenticator } from '~/services/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const user = await authenticator.isAuthenticated(request)
	const account = await documents('accounts').findOne({ user: user?.id })

	const clientId = process.env.PAYPAL_CLIENT_ID as string

	return json({ account, clientId })
}

export default function Checkout() {
	const { account, clientId } = useLoaderData<typeof loader>()

	return (
		<div>
			<h1>Checkout</h1>

			<div style={{ maxWidth: '200px' }}>
				<PayPalScriptProvider
					options={{ clientId: clientId, currency: 'HUF', intent: 'capture' }}
				>
					<PayPalButtons
						createOrder={async data => {
							const response = await fetch('/api/checkout', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({
									intent: 'CREATE_ORDER',
									cart: [
										{
											id: 'item',
											quantity: 'zero',
										},
									],
								}),
							})

							const orderData = await response.json()

							if (orderData.id) {
								return orderData.id
							}
						}}
						onApprove={async data => {
							const response = await fetch('/api/checkout', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({
									intent: 'CAPTURE_ORDER',
									orderID: data.orderID,
								}),
							})

							if (!response.ok) {
								console.error('failed to capture order')
							}

							// do whatever with the captured order
						}}
					/>
				</PayPalScriptProvider>
			</div>

			<pre>{JSON.stringify({ account }, null, 2)}</pre>
		</div>
	)
}
