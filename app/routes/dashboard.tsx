import { LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLocation } from '@remix-run/react'
import Navigation from '~/components/Navigation'
import UploadProvider from '~/components/upload-provider'
import { authenticator } from '~/services/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const user = await authenticator.isAuthenticated(request, {
		failureRedirect: '/login',
	})

	return user
}

const dashboard = () => {
	const location = useLocation()

	return (
		<div>
			<UploadProvider>
				<Navigation />
				<h1>Dashboard</h1>
				<p>{location.pathname}</p>
				<Outlet />
			</UploadProvider>
		</div>
	)
}

export default dashboard
