import { Form, Link } from '@remix-run/react'
import { Auth0Profile } from 'remix-auth-auth0'

type Props = {
	user?: Auth0Profile
}

const ShopHeader = ({ user }: Props) => {
	return (
		<div>
			<div>
				<div>
					<Link to="/dashboard">Dashboard</Link>
				</div>
				<div>
					{user && <span>{user.displayName}</span>}
					<Link to="/account/favorites">Kedvencek</Link>
					<Link to="/account">Fiókom</Link>
					{user ? (
						<Form action="/api/auth0/logout" method="POST">
							<input type="submit" value="Jelentkezz ki" />
						</Form>
					) : (
						<Link to="/login">bejelentkezés</Link>
					)}
				</div>
			</div>
			<div>
				<Link to="/">
					<img src="https://picsum.photos/70/40" alt="logo" />
				</Link>
				<input type="search" placeholder="kereses" />
				<Link to="/account/cart">Kosar</Link>
			</div>
		</div>
	)
}

export default ShopHeader
