import { ActionFunctionArgs } from '@remix-run/node'
import { Form, json, redirect, useActionData } from '@remix-run/react'
import { Link } from '@remix-run/react'
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

const validateNewProduct = (obj: Partial<Inputs>) => {
	const errors: Partial<Inputs> = {}

	if (typeof obj.name != 'string' || obj.name.length < 3) {
		errors['name'] = 'must be more than 3 characters'
	}

	if (typeof obj.brand != 'string' || obj.brand.length < 3) {
		errors['brand'] = 'must be more than 3 characters'
	}

	if (typeof obj.department != 'string' || obj.department.length < 3) {
		errors['department'] = 'must be more than 3 characters'
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
	const errors = validateNewProduct(product)

	if (errors.brand || errors.name || errors.department) {
		return json(errors)
	}

	// store in the database, if schema is enforced on the db,
	// this should throw or return an error
	const insertionResult = await db.products.insertOne(product)

	if (!insertionResult.acknowledged) {
		throw new Error('failed to insert product')
	}

	// go to second stage to fill out extra data on success
	const path = encodeURIComponent(product.name!)
	return redirect(`/dashboard/products/${path}`)
}

export default function NewProductPage() {
	const errors = useActionData<typeof action>()

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
					required
				/>
				<span className='error'>{errors?.name}</span>

				<label htmlFor='brand'>manufacturer</label>
				<input
					type='text'
					name='brand'
					placeholder='eg. nike, citizen, nokia'
					required
				/>
				<span className='error'>{errors?.brand}</span>

				<label htmlFor='department'>category</label>
				<input
					type='text'
					name='department'
					placeholder='eg.: shoes, watches'
					required
				/>
				<span className='error'>{errors?.department}</span>

				<hr />
				<input type='submit' value='create' />
			</Form>
		</section>
	)
}
