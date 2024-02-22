import { LoaderFunctionArgs, json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import Card from '~/components/card'
import { db } from '~/services/db.server'

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const products = await db.products.find({}).limit(10).toArray()

	if (!products) {
		throw new Error('failed to fetch products')
	}

	return json({ products })
}

const ProductsListPage = () => {
	const { products } = useLoaderData<typeof loader>()

	return (
		<div data-page={ProductsListPage.name}>
			<p>Products</p>
			<ul>
				{products &&
					products.map(product => (
						<li key={product.name}>
							<Link to={`${encodeURIComponent(product.name)}`}>
								<Card name={product.name} />
							</Link>
						</li>
					))}
			</ul>
		</div>
	)
}

export default ProductsListPage
