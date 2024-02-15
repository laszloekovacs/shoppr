import { LoaderFunctionArgs, json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { documents } from '~/services/db.server'

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const collection = documents('products')

	const products = await collection.find({}).limit(10).toArray()

	if (!products) {
		throw new Error('failed to fetch products')
	}

	return json({ products })
}

const ProductsListPage = () => {
	const { products } = useLoaderData<typeof loader>()

	return (
		<div data-page={ProductsListPage.name}>
			<h2>Products</h2>
			<ul>
				{products &&
					products.map((product) => (
						<li key={product.name}>
							<Link to={`${encodeURIComponent(product.name)}`}>edit</Link>
						</li>
					))}
			</ul>
		</div>
	)
}

export default ProductsListPage
