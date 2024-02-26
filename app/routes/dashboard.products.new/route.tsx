import { ActionFunctionArgs } from '@remix-run/node'
import { Form, json, redirect, useActionData } from '@remix-run/react'
import { Link } from '@remix-run/react'
import { ProductSchema } from '~/model/product'
import { db } from '~/services/db.server'
import styles from './dashboard.products.new.module.css'

export const handle = {
	breadcrumb: () => <Link to='/dashboard/products/new'>new</Link>
}

type Inputs = {
	name: string
	brand: string
	department: string
}


const validateNewProduct = (obj: Partial<Inputs>): => {
	let errors: any[]

	if (typeof obj.name == 'string' && obj.name.length == 2) {
		errors['name'] = 'must be more than 2 characters'
	}

	if (typeof obj.brand == 'string' && obj.brand.length == 2) {
		errors['brand'] = 'must be more than 2 characters'
	}

	if (typeof obj.department == 'string' && obj.department.length == 2) {
		errors['department'] = 'must be more than 2 characters'
	}

	return errors
}

export async function action({ request }: ActionFunctionArgs) {
	const body = await request.formData()

	// unpack inputs
	const product = {
		name: body.get('name')?.toString(),
		brand: body.get('brand')?.toString(),
		department: body.get('department')?.toString()
	}

	// validate and return complains to client
	const validationErrors = validateNewProduct(product)

	if (validationErrors.keys.length > 0) {
		return json({ errors: validationErrors })
	}

	// store in the database, if schema is enforced on the db,
	// this should throw or return an error
	const insertionResult = await db.products.insertOne(product)

	if (!insertionResult.acknowledged) {
		return json({ error: 'insertion to database failed' })
	}

	// go to second stage to fill out extra data on success
	const path = encodeURIComponent(product.name!)
	return redirect(`/dashboard/products/${path}`)
}

export default function NewProductPage() {
	const actionResult = useActionData<typeof action>()

	return (
		<section className={styles.container}>
			<h2>Create new product</h2>

			<Form method='POST' action='/dashboard/products/new'>
				<label htmlFor='name'>
					name of the new product, must be unique, not present in the database
				</label>
				<input
					type='text'
					name='name'
					placeholder='eg. iPhone, flower print dress'
					autoFocus
				/>
				<span className='error'></span>

				<label htmlFor='brand'>manufacturer</label>
				<input
					type='text'
					name='brand'
					placeholder='eg. nike, citizen, nokia'
				/>
				<span className='error'></span>

				<label htmlFor='department'>category</label>
				<input
					type='text'
					name='department'
					placeholder='eg.: shoes, watches'
				/>
				<span className='error'></span>

				<hr />
				<input type='submit' value='create' />
			</Form>
		</section>
	)
}
