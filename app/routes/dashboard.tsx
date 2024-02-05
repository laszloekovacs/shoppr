import { Outlet } from '@remix-run/react'
import React from 'react'

const dashboard = () => {
	return (
		<div>
			<h1>Dashboard</h1>
			<Outlet />
		</div>
	)
}

export default dashboard
