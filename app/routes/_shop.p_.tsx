import { LoaderFunctionArgs, json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import Card from '~/components/primitives/cards'
import { documents } from '~/services/db.server'

export const loader = async ({ params }: LoaderFunctionArgs) => {
	//invariant(params.query, 'params.query is required')

	const list = await documents('products').find({}).limit(20).toArray()

	return json({ list })
}

export default function ShopList() {
	const { list } = useLoaderData<typeof loader>()
	return (
		<div>
			<ul>
				{list.map((product) => (
					<li key={product.name}>
						<Link to={encodeURIComponent(product.name)}>
							<Card name={product.name} />
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}
