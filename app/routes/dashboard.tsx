import { LoaderFunctionArgs } from '@remix-run/node'
import { Outlet, useLocation } from '@remix-run/react'
import Navigation from '~/components/Navigation'
import Breadcrumps from '~/components/breadcrumps'
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
				<Breadcrumps pathname={location.pathname} />
				<Outlet />
			</UploadProvider>
		</div>
	)
}

export default dashboard
