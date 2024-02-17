import { Link } from '@remix-run/react'
import { Flex } from './primitives/flexbox'

const ShopHeader = () => {
	return (
		<Flex dir="column">
			<Flex dir="row" justifyContent="space-between">
				<div>
					<Link to="/dashboard">Dashboard</Link>
				</div>
				<Flex dir="row">
					<Link to="/account/favorites">Kedvencek</Link>
					<Link to="/account">Fiókom</Link>
					<Link to="/api/auth0/logout">Jelentkezz ki</Link>
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
