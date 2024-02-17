import { Link, Outlet } from '@remix-run/react'
import { Box } from '~/components/primitives/box'
import { Flex } from '~/components/primitives/flex'

export const handle = {
	breadcrumb: () => <Link to="/account">account</Link>,
}

export default function AccountPage() {
	return (
		<Flex dir="row">
			<Flex dir="column" gap="0.2rem" justifyContent="flex-start">
				<Link to="/account">fiókom</Link>
				<Link to="/account/favorites">kedvencek</Link>
				<Link to="/account/cart">kosar</Link>
			</Flex>

			<Flex>
				<Outlet />
			</Flex>
		</Flex>
	)
}
