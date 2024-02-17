import { LoaderFunctionArgs } from '@remix-run/node'
import { Link, Outlet, useMatches } from '@remix-run/react'

import Breadcrumps from '~/components/breadcrumps'
import { authenticator } from '~/services/session.server'
import { Flex, Nav, Typography } from '~/components/primitives'

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
		<Flex dir="column">
			<header>
				<Typography fontSize="4xl">Dashboard</Typography>
				<Breadcrumps matches={matches} />
			</header>
			<Flex dir="row">
				<Nav>
					{dashboardLinks.map((link) => (
						<Link key={link.name} to={link.href}>
							{link.name}
						</Link>
					))}
				</Nav>
				<Outlet />
			</Flex>
		</Flex>
	)
}

export default dashboard
