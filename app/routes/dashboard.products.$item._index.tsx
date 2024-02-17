import { Link } from '@remix-run/react'
import React from 'react'
import { Typography } from '~/components/primitives'

const ItemOverviewPage = () => {
	return (
		<div>
			<Typography fontSize="4xl">Termek adatai</Typography>
			<Link to="edit">
				<Typography bold>Edit</Typography>
			</Link>
		</div>
	)
}

export default ItemOverviewPage
