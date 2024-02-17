import { Link, useLoaderData } from '@remix-run/react'
import { documents } from '~/services/db.server'
import { LoaderFunctionArgs, json } from '@remix-run/node'
import { authenticator } from '~/services/session.server'
import Card from '~/components/cards'

export const handle = {
	breadcrumb: () => <Link to="/account/favorites">favorites</Link>,
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
			projection: { favorites: 1 },
		}
	)

	return json({ items })
}

export default function FavoritesPage() {
	const { items } = useLoaderData<typeof loader>()
	return (
		<div>
			<h1>Kedvencek</h1>

			<ul>
				{items?.favorites?.map((item: { name: string }) => (
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
