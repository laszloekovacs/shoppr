import { Link, Outlet } from '@remix-run/react'
import AccountsBar from '~/components/accounts-bar'

const Shop = () => {
	return (
		<>
			<AccountsBar />
			<Outlet />
		</>
	)
}

export default Shop
