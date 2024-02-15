import { Link, Outlet, json, useLoaderData, useMatches } from '@remix-run/react'
import Breadcrumps from '~/components/breadcrumps'
import BrowsingBar from '~/components/browsing-bar'
import DebugLinks from '~/components/debug-links'
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
	const matches = useMatches()

	return (
		<>
			<DebugLinks />
			<ShopHeader />
			<BrowsingBar data={data} />
			<Breadcrumps matches={matches} />
			<Outlet />
		</>
	)
}

export default Shop
