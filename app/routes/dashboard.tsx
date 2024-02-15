import { LoaderFunctionArgs } from '@remix-run/node'
import { Link, Outlet, useMatches } from '@remix-run/react'
import DebugLinks from '~/components/debug-links'
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

const dashboard = () => {
	const matches = useMatches()

	return (
		<div>
			<DebugLinks />
			<h1>Dashboard</h1>
			<Breadcrumps matches={matches} />

			<Outlet />
		</div>
	)
}

export default dashboard
