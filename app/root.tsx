import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'

import { GlobalStyles } from './components/primitives/global-css'
import ThemeProviderWrapper from './components/primitives/theme-provider'
import Container from './components/primitives/container'

export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<Container>
					<ThemeProviderWrapper>
						<GlobalStyles />
						<Outlet />
					</ThemeProviderWrapper>
					<ScrollRestoration />
					<Scripts />
					<LiveReload />
				</Container>
			</body>
		</html>
	)
}
