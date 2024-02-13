import { LoaderFunctionArgs } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import Navigation from '~/components/Navigation'
import UploadProvider from '~/components/upload-provider'
import { authenticator } from '~/services/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const user = await authenticator.isAuthenticated(request, {
		successRedirect: '/dashboard',
		failureRedirect: '/login',
	})

	return null
}

const dashboard = () => {
	return (
		<div>
			<Navigation />
			<h1>Dashboard</h1>
			<UploadProvider>
				<Outlet />
			</UploadProvider>
		</div>
	)
}

export default dashboard
