import { Link } from '@remix-run/react'

const Navigation = () => {
	return (
		<div>
			<Link to="/dashboard">Dashboard</Link>
			<Link to="/dashboard/products">Products</Link>
			<Link to="/dashboard/products/create">Create</Link>
		</div>
	)
}

export default Navigation
