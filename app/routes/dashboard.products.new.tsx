import { ActionFunction, ActionFunctionArgs } from '@remix-run/node'
import {
	Form,
	json,
	redirect,
	useActionData,
	useLoaderData,
} from '@remix-run/react'

import { ProductSchema, isProductSchema } from '~/models/product'
import { DATABASE, mongodb, MongoServerError } from '~/services/db.server'

export async function loader() {
	return json({})
}

const validateNewProduct = (obj: any) => {
	let errors: {
		field: string
		message: string
	}[] = []

	if (typeof obj.name == 'string' && obj.name.length == 0) {
		errors.push({ field: 'name', message: 'must be more than 0 characters' })
	}

	if (typeof obj.brand == 'string' && obj.brand.length == 0) {
		errors.push({ field: 'brand', message: 'must be more than 0 characters' })
	}

	if (typeof obj.department == 'string' && obj.department.length == 0) {
		errors.push({
			field: 'department',
			message: 'must be more than 0 characters',
		})
	}

	return errors
}

/* create a new entry in the database */
export async function action({ request }: ActionFunctionArgs) {
	// extract data from form
	const body = await request.formData()

	const product: Partial<ProductSchema> = {
		name: body.get('name')?.toString(),
		brand: body.get('brand')?.toString(),
		department: body.get('department')?.toString(),
	}

	// validate and return complains to client
	const validationErrors = validateNewProduct(product)
	if (validationErrors.length > 0) {
		return json({ errors: validationErrors })
	}

	// store in the database

	const collection = mongodb.db(DATABASE).collection('products')
	const insertionResult = await collection.insertOne(product)

	if (!insertionResult.acknowledged) {
		return json({ error: 'insertion to database failed' })
	}
	// go to second stage to fill out extra data
	const path = encodeURIComponent(product.name!)
	return redirect(`/dashboard/products/${path}`)
}

export default function NewProductPage() {
	//const { data } = useLoaderData<typeof loader>()
	const actionData = useActionData<typeof action>()

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
			<pre>{actionData && JSON.stringify(actionData)}</pre>
		</div>
	)
}
