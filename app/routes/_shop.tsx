import { Link, Outlet, json, useLoaderData } from '@remix-run/react'
import BrowsingBar from '~/components/browsing-bar'
import ShopHeader from '~/components/shop-header'
import { documents } from '~/services/db.server'

export const handle = {
	breadcrumb: () => <Link to="/">shop</Link>,
}
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
			{
				$group: {
					_id: null,
					attributes: {
						$addToSet: '$attributes',
					},
				},
			},
			{
				$project: {
					attributes: 1,
				},
			},
		])
		.toArray()

	return json({ brands, departments, attributes })
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
