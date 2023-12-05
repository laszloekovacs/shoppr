import { PAYPAL_CLIENT_ID } from '../app/constants/index.server'
import stylesheet from './tailwind.css'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { json, type LinksFunction, type LoaderFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'

/* inject paypal client id */
export const loader: LoaderFunction = async () => {
  return json({
    clientId: PAYPAL_CLIENT_ID,
  })
}

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
]

export default function App() {
  const { clientId } = useLoaderData<typeof loader>()

  return (
    <html lang="en" data-bs-theme="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div>
          <PayPalScriptProvider
            options={{ clientId: clientId, currency: 'HUF', intent: 'capture' }}
          >
            <Outlet />
          </PayPalScriptProvider>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </div>
      </body>
    </html>
  )
}
