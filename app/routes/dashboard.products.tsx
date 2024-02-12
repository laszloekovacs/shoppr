import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { mongodb, DATABASE, WithId } from '~/services/db.server'
import { ProductSchema } from '~/models/product'

export const loader = async () => {
	// get the last 10 product from the database
	const db = mongodb.db(DATABASE)
	const products = db.collection('products')

	const data = await products
		.find<WithId<ProductSchema>>({})
		.sort({ createdAt: -1 })
		.limit(10)
		.toArray()

	return json({ data })
}

const ProductsPage = () => {
	const { data } = useLoaderData<typeof loader>()

	return (
		<div>
			<ul>
				{data.map((product) => (
					<li key={product._id}>
						<p>{JSON.stringify(product)}</p>
					</li>
				))}
			</ul>
		</div>
	)
}

export default ProductsPage
