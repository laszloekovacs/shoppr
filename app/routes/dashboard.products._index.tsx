import { LoaderFunctionArgs, json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import Card from '~/components/card'
import { Typography } from '~/components/primitives'
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
			<Typography fontSize="4xl">Products</Typography>
			<ul>
				{products &&
					products.map((product) => (
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
