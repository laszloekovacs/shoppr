import { LoaderFunctionArgs, json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { Button, Flex, Typography } from '~/components/primitives'
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
					favorite
				</Button>
				<Button type="submit" name="intent" value="ADD_TO_CART">
					kosárba
				</Button>
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
			console.log('adding to cart' + ' ' + name)
			{
				const result = await documents('accounts').updateOne(
					{ user: user.id }, // find by user
					{ $push: { cart: { name } } } // push into cart
				)
			}
			break

		case 'FAVORITE':
			console.log('adding to favorites' + ' ' + name)
			{
				const result = await documents('accounts').updateOne(
					{ user: user.id }, // find by user
					{ $push: { favorites: { name } } } // push into favorites
				)

				if (result.upsertedCount) {
					console.log('upserted')
				}
			}
			break

		default:
			break
	}

	return json({})
}
