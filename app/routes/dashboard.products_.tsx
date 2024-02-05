// products  page

import { Outlet } from '@remix-run/react'

const Page = () => {
	return (
		<div>
			<h1>products page</h1>
			<Outlet />
		</div>
	)
}

export default Page
