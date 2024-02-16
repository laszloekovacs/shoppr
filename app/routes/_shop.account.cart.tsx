import { LoaderFunctionArgs, json } from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import React from 'react'
import Card from '~/components/Card'
import { documents } from '~/services/db.server'
import { authenticator } from '~/services/session.server'

export const handle = {
	breadcrumb: () => <Link to="/account/cart">cart</Link>,
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const user = await authenticator.isAuthenticated(request, {
		failureRedirect: '/login',
	})

	const items = await documents('accounts').findOne(
		{
			user: user?.id,
		},
		{
			projection: { cart: 1 },
		}
	)

	return json({ items })
}

export default function CartPage() {
	const { items } = useLoaderData<typeof loader>()
	return (
		<div>
			<h1>Kosar</h1>

			<Form method="POST">
				<button type="submit" name="intent" value="TO_CHECKOUT">
					tovább a penztarhoz
				</button>
			</Form>

			<ul>
				{items?.cart?.map((item: { name: string }) => (
					<li key={item.name}>
						<Link to={`/p/${encodeURIComponent(item.name)}`}>
							<Card name={item.name} />
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
