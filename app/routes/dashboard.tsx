import { Outlet } from '@remix-run/react'
import Navigation from '~/components/Navigation'

const dashboard = () => {
	return (
		<div>
			<Navigation />
			<h1>Dashboard</h1>
			<Outlet />
		</div>
	)
}

export default dashboard
