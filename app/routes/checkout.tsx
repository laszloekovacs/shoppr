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

	console.log(clientId)

	return json({ account, clientId })
}

export default function Checkout() {
	const { account, clientId } = useLoaderData<typeof loader>()

	return (
		<div>
			<h1>Checkout</h1>

			<div>
				<PayPalScriptProvider
					options={{ clientId: 'test', currency: 'HUF', intent: 'capture' }}
				>
					<PayPalButtons
						createOrder={async data => {
							return fetch('/checkout', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({
									intent: 'CREATE',
									cart: [
										{
											this: 'item',
											amount: 'zero',
										},
									],
								}),
							})
								.then(response => response.json())
								.then(order => order.id)
						}}
						onApprove={async data => {
							return fetch('/checkout', {
								method: 'POST',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({
									intent: 'APPROVE',
									orderID: data.orderID,
								}),
							})
								.then(response => response.json())
								.then(orderData => {
									alert('ok')
								})
						}}
					/>
				</PayPalScriptProvider>
			</div>

			<pre>{JSON.stringify({ account }, null, 2)}</pre>
		</div>
	)
}

export const action = async ({ request }: ActionFunctionArgs) => {
	const body = await request.json()
	console.log(body)

	switch (body.intent) {
		case 'CREATE': {
			return json({ status: 'created' })
		}
		case 'APPROVE': {
			return json({ status: 'approved' })
		}
	}
}
