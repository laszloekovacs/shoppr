import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	isRouteErrorResponse,
	useRouteError,
} from '@remix-run/react'
import DebugLinks from './components/debuglinks'
import { PropsWithChildren } from 'react'
import { LinksFunction } from '@remix-run/node'
import { cssBundleHref } from '@remix-run/css-bundle'
import './globals.css'

export const links: LinksFunction = () => [
	...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
	{
		rel: 'stylesheet',
		href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap',
	},
]

const Document = ({
	children,
	title,
}: PropsWithChildren<{ title?: string }>) => {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				{title ? <title>{title}</title> : null}

				<Links />
			</head>
			<body>
				{children}
				<DebugLinks />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}

export default function App() {
	return (
		<Document>
			<Outlet />
		</Document>
	)
}

export const ErrorBoundary = () => {
	const error = useRouteError()
	console.error(error)

	if (isRouteErrorResponse(error)) {
		return (
			<Document title={`${error.status} ${error.statusText}`}>
				<div>
					{error.status} {error.statusText}
				</div>
			</Document>
		)
	}

	const errorMessage = error instanceof Error ? error.message : 'Unknown Error'

	return (
		<Document title="Ouch...">
			<div>
				<h1>App Error</h1>
				<pre>{errorMessage}</pre>
			</div>
		</Document>
	)
}
