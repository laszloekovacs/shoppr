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

/* inject bootstrap */
export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
    integrity:
      'sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN',
    crossOrigin: 'anonymous',
  },
]

/* inject paypal client id */
export const loader: LoaderFunction = async () => {
  return json({
    clientId: process.env.PAYPAL_CLIENT_ID,
  })
}

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
        <div className="container-fluid">
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
