import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node'
import { useFetcher, useLoaderData, useActionData } from '@remix-run/react'
import { useState } from 'react'
import { ProductSchema } from '~/models/product'
import { documents, WithId } from '~/services/db.server'

// find the product by name in the database
export const loader = async ({ params }: LoaderFunctionArgs) => {
	const collection = documents('products')

	if (typeof params.item != 'string' || params.item.length == 0) {
		throw new Error(`item name missing or invalid ${params.item}`)
	}

	const item = await collection.findOne<WithId<ProductSchema>>({
		name: params.item,
	})
	if (item) {
		return json({ item })
	}

	throw new Error('failed to fetch item')
}

/* update record */
export const action = async ({ request }: ActionFunctionArgs) => {
	// get the updated data from params
	const body = await request.formData()

	const name = body.get('name')?.toString()
	const brand = body.get('brand')?.toString()
	const department = body.get('department')?.toString()

	if (typeof name == 'string' && name.length > 0) {
		const filter = { name }
		const update = { $set: { brand, department } }
		const updateResult = await documents('products').updateOne(filter, update)
	}

	return json({ status: 'ok' })
}

const ProductDetailsPage = () => {
	const { item } = useLoaderData<typeof loader>()
	const [isEditing, setEditing] = useState(false)
	const fetcher = useFetcher()
	const actionData = useActionData<typeof action>()

	const toggleEditing = (e: any) => {
		setEditing((state) => !state)
	}

	return (
		<div>
			<p>{fetcher.state}</p>
			<h3>Product Details for</h3>
			<h1>{item.name}</h1>
			{!isEditing && <button onClick={toggleEditing}>Edit product</button>}

			<fetcher.Form method="POST">
				<input type="hidden" name="_id" value={item._id} />
				<input type="hidden" name="name" value={item.name} />

				<label htmlFor="brand">brand</label>
				<input
					disabled={!isEditing}
					type="text"
					name="brand"
					defaultValue={item.brand}
				/>

				<label htmlFor="department">department</label>
				<input
					disabled={!isEditing}
					type="text"
					name="department"
					defaultValue={item.department}
				/>

				{isEditing && <input type="submit" value="save" />}
			</fetcher.Form>

			<pre>{JSON.stringify(item)}</pre>
		</div>
	)
}

export default ProductDetailsPage
