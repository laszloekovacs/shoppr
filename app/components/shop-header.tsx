import { Link } from '@remix-run/react'

const ShopHeader = () => {
	return (
		<div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					gap: '1ch',
					justifyContent: 'space-between',
				}}
			>
				<div>
					<Link to="/dashboard">Dashboard</Link>
				</div>
				<div>
					<Link to="/account/favorites">Kedvencek</Link>
					<Link to="/account">Fiókom</Link>
					<Link to="/api/auth0/logout">Jelentkezz ki</Link>
				</div>

				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						gap: '1ch',
						justifyContent: 'space-between',
					}}
				>
					<Link to="/">
						<img src="https://picsum.photos/70/40" alt="logo" />
					</Link>
					<input type="search" />
					<Link to="/account/cart">Kosar</Link>
				</div>
			</div>
		</div>
	)
}

export default ShopHeader
