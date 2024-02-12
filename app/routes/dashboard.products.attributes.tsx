import {
	ActionFunctionArgs,
	json,
	type LoaderFunctionArgs,
} from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { ProductAttributeSchema } from '~/models/product'
import { documents, WithId } from '~/services/db.server'

export async function loader() {
	const collection = documents('attributes')

	const attributes = await collection
		.find<WithId<ProductAttributeSchema>>({})
		.toArray()

	if (!attributes) {
		throw new Error('failed to fetch attributes')
	}

	return json({ attributes })
}

// TODO
// dont store unit if its undefined
// dont allow duplicate names

export async function action({ request }: ActionFunctionArgs) {
	// insert new attibute to the database
	const body = await request.formData()

	const name = body.get('name')?.toString()
	const displayName = body.get('displayName')?.toString()
	let unit = body.get('unit')?.toString()

	// validate
	if (typeof unit == 'string' && unit.length == 0) {
		unit = undefined
	}

	// insert
	const collection = documents('attributes')
	const insetionResult = await collection.insertOne({
		name,
		displayName,
		unit,
	})

	if (!insetionResult.acknowledged) {
		return json({ error: 'insertion to database failed' })
	}

	return json({ status: 'ok' })
}

export default function ItemAttributesPage() {
	const { attributes } = useLoaderData<typeof loader>()
	const fetcher = useFetcher()

	return (
		<div>
			<h1>Item Attributes editor</h1>

			<div>
				<h4>add new attribute</h4>
				<fetcher.Form method="POST">
					<label htmlFor="name">attribute</label>
					<input type="text" name="name" />

					<label htmlFor="displayName">display name</label>
					<input type="text" name="displayName" />

					<label htmlFor="unit">unit</label>
					<input type="text" name="unit" />

					<input type="submit" value="Create" />
				</fetcher.Form>
			</div>
			<hr />
			<ul>
				{attributes.map((attribute) => (
					<li key={attribute._id}>
						<pre>{JSON.stringify(attribute, null, 2)}</pre>
					</li>
				))}
			</ul>
		</div>
	)
}
