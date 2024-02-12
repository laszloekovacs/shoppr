import { useLocation } from '@remix-run/react'
import React from 'react'

const ProductDetailsPage = () => {
	const location = useLocation

	return (
		<div>
			<h2>ProductDetails</h2>
			<pre>{JSON.stringify(location)}</pre>
		</div>
	)
}

export default ProductDetailsPage
