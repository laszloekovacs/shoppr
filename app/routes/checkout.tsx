import { useFetcher } from '@remix-run/react'

export default function Checkout() {
	const fetcher = useFetcher()

	return (
		<div>
			<h1>Checkout</h1>

			<div className="pages"></div>
		</div>
	)
}
