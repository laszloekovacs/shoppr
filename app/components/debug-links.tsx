import { css } from '@emotion/css'
import { Form, NavLink } from '@remix-run/react'
import Button from './primitives/button'
import { Flex } from './primitives/flexbox'
import { Box } from './primitives/basebox'

const links = [
	{ to: '/', label: 'Home' },
	{ to: '/dashboard', label: 'Dashboard' },
	{ to: '/login', label: 'Login' },
	{ to: '/stylebook', label: 'Stylebook' },
]

const styles = css`
	display: flex;
	flex-direction: row;
	gap: 1ch;
`

const DebugLinks = () => {
	return (
		<Box>
			<Flex dir="row" gap="1rem">
				<Form action="/api/auth0/logout" method="post">
					<Button type="submit">Logout</Button>
				</Form>

				<ul className={styles}>
					{links.map((link) => (
						<li key={link.to}>
							<NavLink to={link.to}>{link.label}</NavLink>
						</li>
					))}
				</ul>
			</Flex>
		</Box>
	)
}

export default DebugLinks
