import { LoaderFunctionArgs, json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import React from 'react'
import invariant from 'tiny-invariant'
import { ProductSchema } from '~/models/product'
import { documents } from '~/services/db.server'

export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariant(params, 'params.item is required')

	const item = await documents('products').findOne<ProductSchema>({
		name: params.item,
	})

	if (!item) {
		throw new Error('failed to fetch item')
	}

	return json({ item })
}

export default function ShopItemPage() {
	const { item } = useLoaderData<typeof loader>()

	return (
		<div>
			<h1>{item.name}</h1>
			<h2>{item.brand}</h2>
			<p>{item.department}</p>
			<div>
				<img src="https://picsum.photos/200" />
			</div>

			<Form method="post">
				<input type="hidden" name="name" value={item.name} />
				<button type="submit" name="intent" value="ADD_TO_CART">
					kosárba
				</button>
				<button type="submit" name="intent" value="FAVORITE">
					favorite
				</button>
			</Form>

			<pre>{JSON.stringify(item, null, 2)}</pre>
		</div>
	)
}
