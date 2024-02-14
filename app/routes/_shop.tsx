import { Outlet } from '@remix-run/react'
import CategoriesBar from '~/components/categories-bar'
import ShopHeader from '~/components/shop-header'

const Shop = () => {
	return (
		<>
			<ShopHeader />
			<CategoriesBar />
			<Outlet />
		</>
	)
}

export default Shop
