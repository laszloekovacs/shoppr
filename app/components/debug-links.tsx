import { Form, NavLink } from '@remix-run/react'

const links = [
	{ to: '/', label: 'Home' },
	{ to: '/dashboard', label: 'Dashboard' },
	{ to: '/login', label: 'Login' },
	{ to: './stylebook', label: 'Stylebook' },
]

const DebugLinks = ({ className }: { className?: string }) => {
	return (
		<div className={className}>
			<Form action="/api/auth0/logout" method="post">
				<button type="submit">Logout</button>
			</Form>

			<ul>
				{links.map((link) => (
					<li key={link.to}>
						<NavLink to={link.to}>{link.label}</NavLink>
					</li>
				))}
			</ul>
		</div>
	)
}

export default DebugLinks
