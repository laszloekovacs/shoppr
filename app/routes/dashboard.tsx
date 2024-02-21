import { LoaderFunctionArgs } from '@remix-run/node'
import { Link, Outlet, useMatches } from '@remix-run/react'

import Breadcrumps from '~/components/breadcrumps'
import { authenticator } from '~/services/session.server'

export const handle = {
	breadcrumb: () => <Link to="/dashboard">dashboard</Link>,
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const user = await authenticator.isAuthenticated(request, {
		failureRedirect: '/login',
	})

	return user
}

const dashboardLinks = [
	{ name: 'products', href: '/dashboard/products' },
	{ name: 'create product', href: '/dashboard/products/new' },
]

const dashboard = () => {
	const matches = useMatches()

	return (
		<div>
			<header>
				<h2>Dashboard</h2>
				<Breadcrumps matches={matches} />
			</header>
			<div>
				<div>
					{dashboardLinks.map(link => (
						<Link key={link.name} to={link.href}>
							{link.name}
						</Link>
					))}
				</div>
				<Outlet />
			</div>
		</div>
	)
}

export default dashboard
