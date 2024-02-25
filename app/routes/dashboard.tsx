import { LoaderFunctionArgs } from '@remix-run/node'
import { Link, Outlet, useMatches } from '@remix-run/react'

import Breadcrumps from '~/components/breadcrumps'
import { authenticator } from '~/services/session.server'
import styles from '~/css/dashboard.module.css'

export const handle = {
	breadcrumb: () => <Link to='/dashboard'>dashboard</Link>
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const user = await authenticator.isAuthenticated(request, {
		failureRedirect: '/login'
	})

	return user
}

const dashboardLinks = [
	{ name: 'products', href: '/dashboard/products' },
	{ name: 'create product', href: '/dashboard/products/new' }
]

const dashLinks = {
	'/dashboard/products': 'products',
	'/dashboard/products/new': 'new product'
}

const dashboard = () => {
	const matches = useMatches()

	return (
		<section className={styles.container}>
			<header>
				<h1>Dashboard</h1>
				<Breadcrumps matches={matches} />
			</header>

			<nav>
				{Object.entries(dashLinks).map(([href, name]) => (
					<Link key={href} to={href}>
						{name}
					</Link>
				))}
			</nav>

			<Outlet />
		</section>
	)
}

export default dashboard
