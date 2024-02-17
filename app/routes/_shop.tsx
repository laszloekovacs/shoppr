import { LoaderFunctionArgs } from '@remix-run/node'
import { Link, Outlet, json, useLoaderData, useMatches } from '@remix-run/react'
import Breadcrumps from '~/components/breadcrumps'
import BrowsingBar from '~/components/browsing-bar'
import DebugLinks from '~/components/debug-links'
import ShopHeader from '~/components/shop-header'
import { documents } from '~/services/db.server'
import { authenticator } from '~/services/session.server'

export const handle = {
	breadcrumb: () => <Link to="/">shop</Link>,
}
export const loader = async ({ request }: LoaderFunctionArgs) => {
	// get the user if logged in
	const user = await authenticator.isAuthenticated(request)

	// query the brands
	const brands = await documents('products').distinct('brand')

	// query departments
	const departments = await documents('products').distinct('department')

	// TODO: get special queries

	return json({ user, brands, departments })
}

const Shop = () => {
	const data = useLoaderData<typeof loader>()
	const matches = useMatches()

	return (
		<>
			<DebugLinks />
			<ShopHeader user={data?.user} />
			<BrowsingBar data={data} />
			<Breadcrumps matches={matches} />
			<Outlet />
		</>
	)
}

export default Shop
