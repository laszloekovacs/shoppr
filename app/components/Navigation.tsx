import { Link } from '@remix-run/react'
import styled from '@emotion/styled'

const NavigationBase = ({ className }: { className?: string }) => {
	return (
		<div className={className}>
			<Link to="/">Home</Link>
			<Link to="/dashboard/products/list">product List</Link>
			<Link to="/dashboard/products/new">Create product</Link>
			<Link to="/dashboard/products">Products</Link>
			<Link to="/dashboard">Dashboard</Link>
			<Link to="/dashboard/products/attributes">Attributes</Link>
			<Link to="/dashboard/login">Login</Link>
			<Link to="/dashboard/payout">pay with paypal</Link>
			<Link to="/dashboard/uploader">Upload</Link>
		</div>
	)
}

export default styled(NavigationBase)`
	/* Add your styles here */
	display: flex;
	flex-direction: row;
	gap: 1ch;
`
