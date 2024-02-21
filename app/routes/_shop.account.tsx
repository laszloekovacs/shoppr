import { Link, Outlet } from '@remix-run/react'

export const handle = {
	breadcrumb: () => <Link to="/account">account</Link>,
}

export default function AccountPage() {
	return (
		<div>
			<div>
				<Link to="/account">fiókom</Link>
				<Link to="/account/favorites">kedvencek</Link>
				<Link to="/account/cart">kosar</Link>
			</div>

			<div>
				<Outlet />
			</div>
		</div>
	)
}
