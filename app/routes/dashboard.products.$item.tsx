import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node'
import { useFetcher, useLoaderData, useActionData } from '@remix-run/react'
import { useState } from 'react'
import invariant from 'tiny-invariant'
import { ProductSchema } from '~/models/product'
import { documents, WithId } from '~/services/db.server'

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
			<pre>{JSON.stringify(item)}</pre>
		</div>
	)
}

export const action = async ({ request }: ActionFunctionArgs) => {
	return json({ status: 'ok' })
}
