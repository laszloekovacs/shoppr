import { Link, Outlet } from '@remix-run/react'
import AccountsBar from '~/components/AccountsBar'

const Shop = () => {
	return (
		<>
			<AccountsBar />
			<Outlet />
		</>
	)
}

export default Shop
