import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'

import UploadProvider from './components/upload-provider'
import GlobalStyles from './components/global-styles'

export default function Root() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="title" content="Shoppr" />
				<Meta />
				<Links />
			</head>
			<body>
				<UploadProvider>
					<GlobalStyles />
					<Outlet />
					<ScrollRestoration />
					<Scripts />
					<LiveReload />
				</UploadProvider>
			</body>
		</html>
	)
}
