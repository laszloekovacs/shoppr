import { Outlet } from '@remix-run/react'
import Navigation from '~/components/Navigation'
import UploadProvider from '~/components/upload-provider'

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
