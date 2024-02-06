import { redirect, type ActionFunctionArgs, json } from '@remix-run/node'
import { Form, useActionData, useNavigation } from '@remix-run/react'
import { mongoInsertProduct } from '../services/mongo.server'

// https://remix.run/docs/en/main/discussion/form-vs-fetcher

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()

	// process and validate formData
	const result = await mongoInsertProduct({
		name: formData.get('product') as string,
		price: Number(formData.get('price')),
	})

	if (!result) {
		return json({ errors: 'Failed to create product' })
	}

	return redirect('/dashboard/products')
}
/*
export const loader = async () => {
	return json({

	})
}
*/

const CreateProductPage = () => {
	const navigation = useNavigation()
	const isPending = navigation.formAction === '/dashboard/products/new'
	const actionData = useActionData<typeof action>()

	return (
		<>
			{actionData && <p>{actionData?.errors}</p>}

			<h2>Create new product</h2>
			<Form method="post">
				<label>
					Name: <input name="product" />
				</label>

				<label>
					Price: <input name="price" type="number" />
				</label>

				<button type="submit">
					{isPending ? 'Creating...' : 'Create Product'}
				</button>
			</Form>
		</>
	)
}

export default CreateProductPage
