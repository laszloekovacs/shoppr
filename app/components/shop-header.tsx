import { Form, Link } from '@remix-run/react'
import { Auth0Profile } from 'remix-auth-auth0'
import { Flex } from './primitives'

const ShopHeader = ({ user }: { user: Auth0Profile | null }) => {
	return (
		<Flex dir="column">
			<Flex dir="row" justifyContent="space-between">
				<div>
					<Link to="/dashboard">Dashboard</Link>
				</div>
				<Flex dir="row">
					{user && <span>{user.displayName}</span>}
					<Link to="/account/favorites">Kedvencek</Link>
					<Link to="/account">Fiókom</Link>
					{user ? (
						<Form action="/api/auth0/logout" method="post">
							<input type="submit" value="Jelentkezz ki" />
						</Form>
					) : (
						<Link to="/login">bejelentkezés</Link>
					)}
				</Flex>
			</Flex>
			<Flex justifyContent="space-between">
				<Link to="/">
					<img src="https://picsum.photos/70/40" alt="logo" />
				</Link>
				<input type="search" placeholder="kereses" />
				<Link to="/account/cart">Kosar</Link>
			</Flex>
		</Flex>
	)
}

export default ShopHeader
