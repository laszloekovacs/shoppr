import { NavLink, useLocation } from '@remix-run/react'
import React from 'react'
import { useEffect } from 'react'

const Breadcrumps = ({ pathname }: { pathname: string }) => {
	// decode pathname
	const path = decodeURIComponent(pathname)

	return (
		<div>
			<pre>{JSON.stringify(pathname, null, 2)}</pre>
		</div>
	)
}

export default Breadcrumps
