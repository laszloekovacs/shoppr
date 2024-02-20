import { LoaderFunctionArgs, json } from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { useEffect } from 'react'
import invariant from 'tiny-invariant'
import { Button, Flex, Typography } from '~/components/primitives'
import { ProductSchema } from '~/db/product'
import { documents } from '~/services/db.server'
import { authenticator } from '~/services/session.server'

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	invariant(params, 'params.item is required')

	const user = await authenticator.isAuthenticated(request)

	const account = await documents('accounts').findOne({ user: user?.id })

	const item = await documents('products').findOne<ProductSchema>({
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

	return (
		<div>
			<Flex dir="column">
				<Typography fontSize="4xl">{item.name}</Typography>
				<Typography fontSize="lg">{item.brand}</Typography>
				<Typography>{item.department}</Typography>
			</Flex>
			<div>
				<img src="https://picsum.photos/200" />
			</div>

			<Form method="post">
				<input type="hidden" name="name" value={item.name} />
				<Button type="submit" name="intent" value="FAVORITE">
					kedvel
				</Button>
				<Button type="submit" name="intent" value="ADD_TO_CART">
					kosárba
				</Button>
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
			const result = await documents('accounts').updateOne(
				{ user: user.id },
				{ $addToSet: { cart: { name } } }
			)
			return result.modifiedCount == 1 ? json({ success: true }) : json({})
		}

		case 'FAVORITE': {
			const result = await documents('accounts').updateOne(
				{ user: user.id },
				{ $addToSet: { favorites: { name } } }
			)
			return result.modifiedCount == 1 ? json({ success: true }) : json({})
		}

		default:
			throw new Error(`ivalid intent: ${intent}`)
	}
}
