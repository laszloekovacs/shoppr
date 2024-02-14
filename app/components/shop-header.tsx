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
					<Link to="/favorites">Kedvencek</Link>
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
					<img src="logo" />
					<input type="search" />
					<button>Basket</button>
				</div>
			</div>
		</div>
	)
}

export default ShopHeader
