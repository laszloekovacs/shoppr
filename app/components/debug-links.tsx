import { css } from '@emotion/css'
import { Form, NavLink } from '@remix-run/react'
import { Box, Button, Flex } from './primitives'

const links = [
	{ to: '/', label: 'Home' },
	{ to: '/dashboard', label: 'Dashboard' },
	{ to: '/login', label: 'Login' },
	{ to: '/stylebook', label: 'Stylebook' },
	{ to: '/p', label: 'list' },
]

const styles = css`
	display: flex;
	flex-direction: row;
	gap: 1ch;
	align-items: center;
`
const container = css`
	position: sticky;
	bottom: 0;
	margin-top: auto;
`

const DebugLinks = () => {
	return (
		<div className={container}>
			<Box>
				<Flex dir="row" gap="1rem">
					<Form action="/api/auth0/logout" method="post">
						<Button type="submit">Logout</Button>
					</Form>

					<ul className={styles}>
						{links.map(link => (
							<li key={link.to}>
								<NavLink to={link.to}>{link.label}</NavLink>
							</li>
						))}
					</ul>
				</Flex>
			</Box>
		</div>
	)
}

export default DebugLinks
