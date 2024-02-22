import { Form, NavLink } from '@remix-run/react'

const DebugLinks = () => {
	const links = [
		{ to: '/', label: 'Home' },
		{ to: '/dashboard', label: 'Dashboard' },
		{ to: '/login', label: 'Login' },
		{ to: '/p', label: 'Shoppinglist' },
		{ to: '/stripe/checkout', label: 'Stripe' },
		{ to: '/stylesheet', label: 'Stylesheet' },
	]

	return (
		<div>
			<Form action="/api/auth0/logout" method="POST">
				<button type="submit">Logout</button>
			</Form>

			<nav>
				{links.map(link => (
					<NavLink key={link.to} to={link.to}>
						{link.label}
					</NavLink>
				))}
			</nav>
		</div>
	)
}

export default DebugLinks
