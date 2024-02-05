// products  page

import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { mongoFindAllProducts } from '~/services/mongo.server'

export const loader = async () => {
	return json({
		products: await mongoFindAllProducts({ skip: 0, limit: 10 }),
	})
}

const Page = () => {
	const { products } = useLoaderData<typeof loader>()

	return (
		<div>
			<h1>products list</h1>
			{products && (
				<ul>
					{products.map((product) => (
						<li key={product._id}>
							<div>
								{product.name}
								{product.price}
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default Page
