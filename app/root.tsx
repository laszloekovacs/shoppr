import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'

import { GlobalStyles } from './components/global-styles'
import ThemeProviderWrapper from './components/theme-provider'
import { Container } from './components/primitives'
import DebugLinks from './components/debug-links'

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
				<ThemeProviderWrapper>
					<Container>
						<GlobalStyles />
						<Outlet />
						<DebugLinks />
					</Container>
				</ThemeProviderWrapper>
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
