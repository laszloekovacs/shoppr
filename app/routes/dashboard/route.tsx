import { LoaderFunctionArgs } from '@remix-run/node'
import { Link, Outlet, useMatches } from '@remix-run/react'

import Breadcrumps from '~/routes/dashboard/breadcrumps'
import { authenticator } from '~/services/session.server'
import styles from './dashboard.module.css'

export const handle = {
	breadcrumb: () => <Link to='/dashboard'>dashboard</Link>
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const user = await authenticator.isAuthenticated(request, {
		failureRedirect: '/login'
	})

	return user
}

const dashboard = () => {
	const matches = useMatches()

	const dashLinks = {
		'/dashboard/products': 'products',
		'/dashboard/products/new': 'new product'
	}

	return (
		<section id='dashboard' className={styles.container}>
			<header>
				<Breadcrumps matches={matches} />
				<Link to='/dashboard'>
					<h1>Dashboard</h1>
				</Link>
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
