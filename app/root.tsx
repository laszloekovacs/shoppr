import stylesheet from './tailwind.css'
import { json, type LinksFunction } from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from '@remix-run/react'
import { connectDatabase } from './services/mongoose.server'

/* inject tailwind style sheet */
export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: stylesheet },
]

export const loader = async () => {
	/* conect to mongodb */
	connectDatabase()

	return json({})
}

export default function App() {
	return (
		<html
			lang="en"
			className="text-gray-900 bg-neutral-300 dark:bg-slate-900 dark:text-neutral-200"
		>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
