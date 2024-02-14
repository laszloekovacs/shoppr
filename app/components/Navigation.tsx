import { NavLink } from '@remix-run/react'
import styled from '@emotion/styled'

const NavigationBase = ({ className }: { className?: string }) => {
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
		</div>
	)
}

export default styled(NavigationBase)`
	/* Add your styles here */
	display: flex;
	flex-direction: row;
	gap: 1ch;
`
