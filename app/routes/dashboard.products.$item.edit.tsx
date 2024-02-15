import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node'
import { useFetcher, useLoaderData, useActionData } from '@remix-run/react'
import { ProductSchema } from '~/db/product'
import { documents, WithId } from '~/services/db.server'
import invariant from 'tiny-invariant'

// find the product by name in the database
export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariant(params.item, 'params.item is required')

	const item = await documents('products').findOne<WithId<ProductSchema>>({
		name: params.item,
	})
	if (item) {
		return json({ item })
	}

	throw new Error('failed to fetch item')
}

export default function ProductDetailsPage() {
	const { item } = useLoaderData<typeof loader>()
	const fetcher = useFetcher()
	const actionData = useActionData<typeof action>()

	return (
		<div>
			<h1>{item.name}</h1>
			<h2>{item.brand}</h2>
			<p>
				<span>{item.department}</span>
			</p>
			<p>
				<span>adatbázis index: </span>
				<span>{item._id}</span>
			</p>
			<hr />

			<fetcher.Form method="post">
				<label>
					Kategória
					<input type="text" name="department" defaultValue={item.department} />
				</label>

				<input type="hidden" name="name" value={item.name} />
				<button type="submit" name="intent" value="SET_DEPARTMENT">
					Rögzít
				</button>
			</fetcher.Form>

			<fetcher.Form method="post">
				<label>
					Gyártó
					<input type="text" name="brand" defaultValue={item.brand} />
				</label>
				<>
					<input type="hidden" name="intent" value="SET_BRAND" />
					<input type="hidden" name="name" value={item.name} />
					<input type="submit" value="Rögzít" />
				</>
			</fetcher.Form>
			<hr />

			<h3>Termék adatok</h3>
			<fetcher.Form method="post">
				<label>
					kulcs
					<input type="text" name="attribute" />
				</label>
				<label>
					érték
					<input type="text" name="attributeValue" />
				</label>
				<>
					<input type="hidden" name="name" value={item.name} />
					<button type="submit" name="intent" value="ADD_ATTRIBUTE">
						Hozzáadás
					</button>
				</>
			</fetcher.Form>

			<pre>{JSON.stringify(item, null, 2)}</pre>
		</div>
	)
}

export const action = async ({ request }: ActionFunctionArgs) => {
	const body = await request.formData()

	const name = body.get('name')?.toString()
	const intent = body.get('intent')?.toString()

	switch (intent) {
		case 'SET_DEPARTMENT':
			const department = body.get('department')?.toString()
			documents('products').updateOne({ name }, { $set: { department } })
			break

		case 'SET_BRAND':
			const brand = body.get('brand')?.toString()
			documents('products').updateOne({ name }, { $set: { brand } })
			break

		case 'ADD_ATTRIBUTE':
			const attribute = body.get('attribute')?.toString()
			const attributeValue = body.get('attributeValue')?.toString()

			documents('products').updateOne(
				{ name },
				{
					$set: {
						[`attributes.${attribute}`]: attributeValue,
					},
				}
			)
			break

		default:
			throw new Error('invalid intent')
	}

	return json({ status: 'ok' })
}
