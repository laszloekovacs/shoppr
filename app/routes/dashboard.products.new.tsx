import { ActionFunction, ActionFunctionArgs } from '@remix-run/node'
import { Form, json, redirect, useLoaderData } from '@remix-run/react'
import { ProductSchema, isProductSchema } from '~/models/product'

export async function loader() {
	return json({})
}

/* create a new entry in the database */
export async function action({ request }: ActionFunctionArgs) {
	const body = await request.formData()

	const product = {
		name: body.get('name'),
		brand: body.get('brand'),
		department: body.get('department'),
		isPublished: false,
		attributes: [],
		images: [],
		options: [],
	}

	// validate type
	if (!isProductSchema(product)) {
		throw new Error('not a product')
	}
	// TODO: validate values

	// store in the database
	console.log('product created')

	return redirect('/dashboard/products')
}

export default function NewProductPage() {
	//const { data } = useLoaderData<typeof loader>()

	return (
		<div>
			<h2>Create New Product</h2>
			<Form method="POST" action="/dashboard/products/new">
				<label htmlFor="name">name</label>
				<input type="text" name="name" />

				<label htmlFor="brand">brand</label>
				<input type="text" name="brand" />

				<label htmlFor="department">department</label>
				<input type="text" name="department" />

				<input type="submit" />
			</Form>
		</div>
	)
}
