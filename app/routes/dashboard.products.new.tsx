import { redirect, type ActionFunctionArgs } from '@remix-run/node'
import { Form, useNavigation } from '@remix-run/react'

// https://remix.run/docs/en/main/discussion/form-vs-fetcher

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()

	// process and validate formData
	console.log(formData)

	return redirect('/dashboard/products')
}

const CreateProductPage = () => {
	const navigation = useNavigation()
	const isPending = navigation.formAction === '/dashboard/products/new'

	return (
		<>
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
