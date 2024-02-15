import { Link, Outlet, useLocation } from '@remix-run/react'

export const handle = {
	breadcrumb: () => <Link to="/dashboard/products">products</Link>,
}

const ProductsPage = () => {
	return (
		<div>
			<Outlet />
		</div>
	)
}

export default ProductsPage
