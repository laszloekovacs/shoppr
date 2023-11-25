import { cssBundleHref } from '@remix-run/css-bundle'
import type { LinksFunction } from '@remix-run/node'
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import 'dotenv/config'

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
]

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://www.paypal.com/sdk/js?client-id=ASi0nLR3W3Z5QQ-37Prv41WJ_EywNp5ttaLY2RUdVuhc_d7D17tIBZuWk3OmBhFbG31NEz2McKhVQTB9&currency=HUF"></script>
        <Meta />
        <Links />
      </head>
      <body>
        <Link to="/buy">buy</Link>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
