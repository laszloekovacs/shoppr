import { LoaderFunctionArgs, json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import Card from '~/components/card'
import { db } from '~/services/db.server'
import { authenticator } from '~/services/session.server'

export const handle = {
	breadcrumb: () => <Link to='/account/cart'>cart</Link>
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const user = await authenticator.isAuthenticated(request, {
		failureRedirect: '/login'
	})

	const items = await db.accounts.findOne(
		{
			user: user?.id
		},
		{
			projection: { cart: 1 }
		}
	)

	return json({ items })
}

export default function CartPage() {
	const { items } = useLoaderData<typeof loader>()
	return (
		<div>
			<div>
				<p>Kosar</p>
				<Link to='/stripe/checkout'>tovább a penztarhoz</Link>
			</div>

			<div>
				{items?.cart?.map((item: { name: string }) => (
					<li key={item.name}>
						<Link to={`/p/${encodeURIComponent(item.name)}`}>
							<Card name={item.name} />
						</Link>
					</li>
				))}
			</div>
		</div>
	)
}
