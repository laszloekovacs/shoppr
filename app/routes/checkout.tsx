import {
	CreateOrderActions,
	CreateOrderData,
	OnApproveActions,
	OnApproveData,
} from '@paypal/paypal-js'
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import RawData from '~/components/raw-data'
import { documents } from '~/services/db.server'
import { authenticator } from '~/services/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const user = await authenticator.isAuthenticated(request)
	const account = await documents('accounts').findOne({ user: user?.id })

	const clientId = process.env.PAYPAL_CLIENT_ID as string

	return json({ account, clientId })
}

export default function Checkout() {
	const { account } = useLoaderData<typeof loader>()

	return (
		<div>
			<h1>Checkout</h1>

			<div>
				<PayPalScriptProvider options={{ clientId: 'test' }}>
					<PayPalButtons createOrder={createOrder} onApprove={onApprove} />
				</PayPalScriptProvider>
			</div>

			<pre>{JSON.stringify({ account }, null, 2)}</pre>
		</div>
	)
}

const createOrder = async (
	data: CreateOrderData,
	actions: CreateOrderActions
): Promise<string> => {
	return ''
}

const onApprove = async (
	data: OnApproveData,
	actions: OnApproveActions
): Promise<void> => {
	return
}
