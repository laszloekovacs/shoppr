import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { ProductSchema } from '~/models/product'
import { DATABASE, WithId, mongodb } from '~/services/db.server'

// find the product by name in the database
export const loader = async ({ params }: LoaderFunctionArgs) => {
	const collection = mongodb.db(DATABASE).collection('products')

	if (typeof params.item != 'string' || params.item.length == 0) {
		throw new Error(`item name missing or invalid ${params.item}`)
	}

	const item = await collection.findOne<WithId<ProductSchema>>({
		name: params.item,
	})
	return json({ item })
}

const ProductDetailsPage = () => {
	const { item } = useLoaderData<typeof loader>()

	return (
		<div>
			<h2>Product Details for</h2>
			<pre>{JSON.stringify(item)}</pre>
		</div>
	)
}

export default ProductDetailsPage
