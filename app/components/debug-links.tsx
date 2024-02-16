import { Form, NavLink } from '@remix-run/react'
import styled from '@emotion/styled'

const DebugLinks = ({ className }: { className?: string }) => {
	return (
		<div className={className}>
			<NavLink to="/">Home</NavLink>

			<NavLink to="/dashboard/products/new">Create product</NavLink>
			<NavLink to="/dashboard/products">Products</NavLink>
			<NavLink to="/dashboard">Dashboard</NavLink>
			<NavLink to="/dashboard/products/attributes">Attributes</NavLink>
			<NavLink to="/login">Login</NavLink>
			<NavLink to="/dashboard/payout">pay with paypal</NavLink>
			<NavLink to="/dashboard/uploader">Upload</NavLink>
			<NavLink to="/p">shopping list</NavLink>
			<Form action="/api/auth0/logout" method="post">
				<button type="submit">Logout</button>
			</Form>
			<NavLink to="/account/cart">cart</NavLink>
		</div>
	)
}

export default styled(DebugLinks)`
	/* Add your styles here */
	display: flex;
	flex-direction: row;
	gap: 1ch;
	border: 1px solid rgba(0, 0, 0, 0.2);
`
