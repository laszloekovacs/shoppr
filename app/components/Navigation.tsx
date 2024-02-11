import { Link } from '@remix-run/react'
import styled from '@emotion/styled'

const NavigationBase = ({ className }: { className?: string }) => {
	return (
		<div className={className}>
			<Link to="/">Home</Link>
			<Link to="/dashboard">Dashboard</Link>
			<Link to="/dashboard/products">Products</Link>
			<Link to="/dashboard/products/new">Create</Link>
			<Link to="/dashboard/departments">Departments</Link>
		</div>
	)
}

export default styled(NavigationBase)`
	/* Add your styles here */
	display: flex;
	flex-direction: row;
	gap: 1ch;
`
