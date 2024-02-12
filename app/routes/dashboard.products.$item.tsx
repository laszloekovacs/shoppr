import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { mongodb } from '~/services/db.server'

export const loader = async ({ params }: LoaderFunctionArgs) => {
	return json({ item: params.item })
}

const ProductDetailsPage = () => {
	const { item } = useLoaderData<typeof loader>()

	return (
		<div>
			<h2>Product Details for {item}</h2>
			<pre>{item}</pre>
		</div>
	)
}

export default ProductDetailsPage
