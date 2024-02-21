import { ActionFunctionArgs } from '@remix-run/node'
import { Form, json, redirect, useActionData } from '@remix-run/react'
import { Link } from '@remix-run/react'
import { Typography } from '~/components/primitives'
import { ProductSchema } from '~/model/product'
import { db } from '~/services/db.server'

export const handle = {
	breadcrumb: () => <Link to="/dashboard/products/new">new</Link>,
}

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

export async function action({ request }: ActionFunctionArgs) {
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
	const insertionResult = await db.products.insertOne(product)

	if (!insertionResult.acknowledged) {
		return json({ error: 'insertion to database failed' })
	}
	// go to second stage to fill out extra data
	const path = encodeURIComponent(product.name!)
	return redirect(`/dashboard/products/${path}/edit`)
}

export default function NewProductPage() {
	//const { data } = useLoaderData<typeof loader>()
	const actionData = useActionData<typeof action>()

	return (
		<div>
			<Typography fontSize="4xl">Uj termék letrehozasa</Typography>
			<Form method="POST" action="/dashboard/products/new">
				<input type="text" name="name" placeholder="termek neve" />

				<input type="text" name="brand" placeholder="gyarto" />

				<input type="text" name="department" placeholder="kategoria" />

				<input type="submit" value="Létrehozás" />
			</Form>
		</div>
	)
}
