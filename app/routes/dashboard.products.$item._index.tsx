import { Link } from '@remix-run/react'

const ItemOverviewPage = () => {
	return (
		<div>
			<h2>Termek adatai</h2>
			<Link to="edit">
				<p>Edit</p>
			</Link>
		</div>
	)
}

export default ItemOverviewPage
