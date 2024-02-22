import { LoaderFunctionArgs, json } from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'

import invariant from 'tiny-invariant'

import { ProductSchema } from '~/model/product'
import { db } from '~/services/db.server'
import { authenticator } from '~/services/session.server'

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	invariant(params, 'params.item is required')

	const user = await authenticator.isAuthenticated(request)

	const account = await db.accounts.findOne({ user: user?.id })

	const item = await db.products.findOne<ProductSchema>({
		name: params.item,
	})

	if (!item) {
		throw new Error('failed to fetch item')
	}

	return json({ item, account })
}

export default function ShopItemPage() {
	const { item, account } = useLoaderData<typeof loader>()
	const actionData = useActionData<typeof action>()

	const favorited = account?.favorites?.includes(item.name)

	return (
		<div>
			<div dir="column">
				<p>{item.name}</p>
				<p>{item.brand}</p>
				<p>{item.department}</p>
			</div>
			<div>
				<img src="https://picsum.photos/200" />
			</div>

			<Form method="post">
				<input type="hidden" name="name" value={item.name} />

				<button
					type="submit"
					name="intent"
					value={favorited ? 'UNFAVORITE' : 'FAVORITE'}
				>
					{favorited ? 'nemkedvel' : 'kedvel'}
				</button>
				<button type="submit" name="intent" value="ADD_TO_CART">
					kosárba
				</button>
			</Form>

			<pre>{JSON.stringify({ item, account }, null, 2)}</pre>
		</div>
	)
}

export async function action({ request }: LoaderFunctionArgs) {
	invariant(request, 'request is required')
	const formData = await request.formData()
	const user = await authenticator.isAuthenticated(request)

	const name = formData.get('name')?.toString()
	const intent = formData.get('intent')?.toString()

	if (!user) {
		throw new Error('user is required')
	}

	switch (intent) {
		case 'ADD_TO_CART': {
			const result = await db.accounts.updateOne(
				{ user: user.id },
				{ $addToSet: { cart: { name } } }
			)
			return result.modifiedCount == 1 ? json({ success: true }) : json({})
		}

		case 'FAVORITE': {
			const result = await db.accounts.updateOne(
				{ user: user.id },
				{ $addToSet: { favorites: name } }
			)
			return result.modifiedCount == 1 ? json({ success: true }) : json({})
		}

		case 'UNFAVORITE': {
			const result = await db.accounts.updateOne(
				{ user: user.id },
				{ $pull: { favorites: name } }
			)
			return result.modifiedCount == 1 ? json({ success: true }) : json({})
		}

		default:
			throw new Error(`ivalid intent: ${intent}`)
	}
}
