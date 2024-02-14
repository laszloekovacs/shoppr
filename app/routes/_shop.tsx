import { Outlet, json, useLoaderData } from '@remix-run/react'
import BrowsingBar from '~/components/browsing-bar'
import ShopHeader from '~/components/shop-header'
import { documents } from '~/services/db.server'

export const loader = async () => {
	// query the brands
	const brands = await documents('products').distinct('brand')

	// query departments
	const departments = await documents('products').distinct('department')

	// query all attibute keys in all products
	const attributes = await documents('products')
		.aggregate([
			{
				$unwind: {
					path: '$attributes',
				},
			},
		])
		.toArray()

	console.log(attributes)

	return json({ brands, departments })
}

const Shop = () => {
	const data = useLoaderData<typeof loader>()

	return (
		<>
			<ShopHeader />
			<BrowsingBar data={data} />
			<Outlet />
		</>
	)
}

export default Shop
