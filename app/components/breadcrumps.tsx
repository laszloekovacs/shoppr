import { NavLink, useLocation } from '@remix-run/react'
import React from 'react'
import { useEffect } from 'react'

const Breadcrumps = ({ location }: { location: string }) => {
	// decode pathname
	const pathname = decodeURIComponent(window.location.pathname)

	return (
		<div>
			<pre>{JSON.stringify(pathname, null, 2)}</pre>
		</div>
	)
}

export default Breadcrumps
