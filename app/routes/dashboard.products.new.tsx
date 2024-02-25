import { ActionFunctionArgs } from '@remix-run/node'
import { Form, json, redirect, useActionData } from '@remix-run/react'
import { Link } from '@remix-run/react'
import { ProductSchema } from '~/model/product'
import { db } from '~/services/db.server'
import styles from '~/css/dashboard.products.new.module.css'

export const handle = {
	breadcrumb: () => <Link to='/dashboard/products/new'>new</Link>
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
			message: 'must be more than 0 characters'
		})
	}

	return errors
}

export async function action({ request }: ActionFunctionArgs) {
	const body = await request.formData()

	const data = Object.fromEntries(body)

	const product: Partial<ProductSchema> = {
		name: body.get('name')?.toString(),
		brand: body.get('brand')?.toString(),
		department: body.get('department')?.toString()
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
	const actionResult = useActionData<typeof action>()

	return (
		<section className={styles.container}>
			<h2>Create new product</h2>

			<Form method='POST' action='/dashboard/products/new'>
				<input type='text' name='name' placeholder='product name' />
				<input type='text' name='brand' placeholder='manufacturer' />
				<input type='text' name='department' placeholder='category' />
				<input type='submit' value='create' />
			</Form>
		</section>
	)
}
