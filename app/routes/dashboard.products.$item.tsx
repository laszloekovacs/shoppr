import React from 'react'
import { Outlet } from '@remix-run/react'

const ItemPage = () => {
	return (
		<div>
			<p>put tabs here</p>
			<Outlet />
		</div>
	)
}

export default ItemPage
