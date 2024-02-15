import { LoaderFunctionArgs, json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { ObjectId } from 'mongodb'
import React from 'react'
import invariant from 'tiny-invariant'
import addToFavorites from '~/db/add-to-favorites.server'
import { ProductSchema } from '~/db/product'
import { documents } from '~/services/db.server'

import { authenticator } from '~/services/session.server'

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
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
		</div>
	)
}

export async function action({ request }: LoaderFunctionArgs) {
	invariant(request, 'request is required')
	const formData = await request.formData()
	const user = await authenticator.isAuthenticated(request)

	const name = formData.get('name') as string
	const intent = formData.get('intent')?.toString()

	if (!user || name.length == 0) {
		console.log('failed to fetch item')
		return
	}

	switch (intent) {
		case 'ADD_TO_CART':
			break

		case 'FAVORITE':
			console.log('adding to cart' + ' ' + name)

			const result = await documents('accounts').updateOne(
				{ user: user.id }, // find by user
				{ $push: { cart: { name } } } // update document if it exists
			)

			if (result.upsertedCount) {
				console.log('upserted')
			}

			break

		default:
			break
	}

	return json({})
}
