import { useActionData, useFetcher, useLoaderData } from '@remix-run/react'
import {
	ActionFunctionArgs,
	LoaderFunction,
	LoaderFunctionArgs,
	json,
} from '@remix-run/node'
import { CategoryDocument, CategoryModel } from '@/models/schema.server'

export const action = async (params: ActionFunctionArgs) => {
	const { request } = params
	const formData = await request.formData()
	const name = formData.get('name')?.toString()

	if (!name) {
		return json({ errors: { name: 'Name is required' } })
	}

	const category = await CategoryModel.create({ name })

	return json({ name: category.name })
}

export const loader: LoaderFunction = async (params: LoaderFunctionArgs) => {
	/* query all categories, serialize it */

	const query = await CategoryModel.find<CategoryDocument>({})

	const categories = query.map((category) => {
		return {
			_id: category._id,
			name: category.name,
		}
	})

	return json({ categories })
}

const CreateCategoryPage = () => {
	const fetcher = useFetcher<typeof loader>()
	const { categories } = useLoaderData<typeof loader>()
	const actionData = useActionData<typeof action>()

	return (
		<div>
			<h2>Create Category</h2>
			<fetcher.Form method="POST">
				<input type="text" name="name" />
				<span>{actionData?.errors?.name}</span>
				<input type="submit" value="Submit" role="submit" />
			</fetcher.Form>

			{categories ? (
				<ul>
					{categories.map((category) => (
						<li key={category._id}>{category.name}</li>
					))}
				</ul>
			) : (
				<p>No categories found, add some!</p>
			)}

			<pre>{JSON.stringify(fetcher.data, null, 2)}</pre>
		</div>
	)
}

export default CreateCategoryPage
