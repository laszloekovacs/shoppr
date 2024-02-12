import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { WithId, documents } from '~/services/db.server'
import invariant from 'tiny-invariant'
import { ProductAttributeSchema, ProductSchema } from '~/models/product'

export async function loader({ params }: LoaderFunctionArgs) {
	invariant(params.item, 'params.item is required')

	// find the product by name in the database
	const item = await documents('products').findOne<WithId<ProductSchema>>({
		name: params.item,
	})

	// get all the attribute templates in the database
	const attributesList = await documents('attributes')
		.find<WithId<ProductAttributeSchema>>({})
		.toArray()

	if (!item) {
		throw new Error('item not found')
	}

	return json({ item, attributesList })
}

export const action = async ({ request }: ActionFunctionArgs) => {
	const body = await request.formData()

	const item = body.get('item')?.toString()
	const attribute = body.get('attribute')?.toString()

	// copy attribute to product.attributes without id
	const attirbuteTemplate = await documents('attributes').findOne(
		{
			name: attribute,
		},
		{ projection: { _id: 0 } }
	)

	const result = await documents('products').updateOne(
		{ name: item },
		{
			$push: { attributes: attirbuteTemplate },
		}
	)

	return json({ status: 'ok' })
}

// add attributes to products
export default function ItemAttributesPage() {
	const fetcher = useFetcher()
	const { item, attributesList } = useLoaderData<typeof loader>()

	return (
		<div>
			<h2>Add attribute to product</h2>
			<h1>{item.name}</h1>

			<p>possible attibutes</p>
			<ul>
				{attributesList &&
					attributesList.map((attribute) => (
						<li key={attribute.name}>
							<pre>{JSON.stringify(attribute, null, 2)}</pre>
							<fetcher.Form method="POST">
								<input type="hidden" name="item" value={item.name} />

								<input type="hidden" name="attribute" value={attribute.name} />
								<button type="submit">add</button>
							</fetcher.Form>
						</li>
					))}
			</ul>

			<p>list of attributes</p>
			<ul>
				{item.attributes &&
					item.attributes.map((attribute) => (
						<li key={attribute.name}>{attribute.displayName}</li>
					))}
			</ul>
		</div>
	)
}
