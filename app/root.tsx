import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useMatches,
} from '@remix-run/react'
import type { LinksFunction } from '@remix-run/node'
import UploadProvider from './components/upload-provider'
import styles from './styles.css'
import Breadcrumps from './components/breadcrumps'

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: styles },
	{
		rel: 'stylesheet',
		href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css',
	},
]

export default function Root() {
	const matches = useMatches()

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="title" content="Shoppr" />
				<Meta />
				<Links />
				<script src="https://unpkg.com/@highlightjs/cdn-assets@11.9.0/highlight.min.js"></script>
				<script src="https://unpkg.com/@highlightjs/cdn-assets@11.9.0/languages/json.min.js"></script>
			</head>
			<body>
				<UploadProvider>
					<Outlet />
					<ScrollRestoration />
					<Scripts />
					<LiveReload />
					<Breadcrumps matches={matches} />
				</UploadProvider>
			</body>
		</html>
	)
}
