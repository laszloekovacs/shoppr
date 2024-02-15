import { Link, Outlet } from '@remix-run/react'
import React from 'react'

export const handle = {
	breadcrumb: () => <Link to="/account">account</Link>,
}

export default function AccountPage() {
	return (
		<>
			<Outlet />
		</>
	)
}
