import { ActionFunctionArgs } from '@remix-run/node'
import { Form, json, redirect, useActionData } from '@remix-run/react'
import { Link } from '@remix-run/react'
import { ProductSchema } from '~/model/product'
import { db } from '~/services/db.server'
import styles from './dashboard.products.new.module.css'
import invariant from 'tiny-invariant'

export const handle = {
	breadcrumb: () => <Link to='/dashboard/products/new'>new</Link>
}

type Inputs = {
	name: string
	brand: string
	department: string
}

const validateNewProduct = (obj: Partial<Inputs>) => {
	const errors: { key: string; message: string }[] = []

	if (typeof obj.name == 'string' && obj.name.length == 2) {
		errors.set('name', 'must be more than 2 characters')
	}

	if (typeof obj.brand == 'string' && obj.brand.length == 2) {
		errors.set('brand', 'must be more than 2 characters')
	}

	if (typeof obj.department == 'string' && obj.department.length == 2) {
		errors.set('department', 'must be more than 2 characters')
	}

	return errors
}

export async function action({ request }: ActionFunctionArgs) {
	const body = await request.formData()
	const errors: { key: string; message: string }[] = []

	// unpack inputs
	const product = {
		name: body.get('name')?.toString(),
		brand: body.get('brand')?.toString(),
		department: body.get('department')?.toString()
	}

	// validate and return complains to client
	validateNewProduct(product, errors)

	if (errors.size > 0) {
		return json({ errors })
	}

	// store in the database, if schema is enforced on the db,
	// this should throw or return an error
	const insertionResult = await db.products.insertOne(product)

	if (!insertionResult.acknowledged) {
		errors.set('insertion', 'insertion to database failed')
		return json({ errors })
	}

	// go to second stage to fill out extra data on success
	const path = encodeURIComponent(product.name!)
	return redirect(`/dashboard/products/${path}`)
}

export default function NewProductPage() {
	const data = useActionData<typeof action>()
	invariant(data, 'should not arrive here without a valid data object')

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
