import { Form, NavLink } from '@remix-run/react'

const links = [
	{ to: '/', label: 'Home' },
	{ to: '/dashboard', label: 'Dashboard' },
	{ to: '/login', label: 'Login' },
	{ to: '/stylebook', label: 'Stylebook' },
	{ to: '/p', label: 'list' },
	{ to: '/checkout', label: 'Checkout' },
	{ to: '/stripe/checkout', label: 'stripe Hosted' },
]

const DebugLinks = () => {
	return (
		<div>
			<div>
				<div>
					<Form action="/api/auth0/logout" method="post">
						<button type="submit">Logout</button>
					</Form>

					<ul>
						{links.map(link => (
							<li key={link.to}>
								<NavLink to={link.to}>{link.label}</NavLink>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default DebugLinks
