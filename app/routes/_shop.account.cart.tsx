import { LoaderFunctionArgs, json } from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import { Text } from '~/components/primitives/text'
import Card from '~/components/card'
import { Flex } from '~/components/primitives/flexbox'
import { documents } from '~/services/db.server'
import { authenticator } from '~/services/session.server'

export const handle = {
	breadcrumb: () => <Link to="/account/cart">cart</Link>,
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const user = await authenticator.isAuthenticated(request, {
		failureRedirect: '/login',
	})

	const items = await documents('accounts').findOne(
		{
			user: user?.id,
		},
		{
			projection: { cart: 1 },
		}
	)

	return json({ items })
}

export default function CartPage() {
	const { items } = useLoaderData<typeof loader>()
	return (
		<Flex dir="column">
			<Flex dir="column" gap="0.2rem" justifyContent="flex-start">
				<Text fontSize="4xl">Kosar</Text>
				<Form method="POST">
					<button type="submit" name="intent" value="TO_CHECKOUT">
						tovább a penztarhoz
					</button>
				</Form>
			</Flex>

			<Flex dir="row">
				{items?.cart?.map((item: { name: string }) => (
					<li key={item.name}>
						<Link to={`/p/${encodeURIComponent(item.name)}`}>
							<Card name={item.name} />
						</Link>
					</li>
				))}
			</Flex>
		</Flex>
	)
}
