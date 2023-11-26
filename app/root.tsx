import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { cssBundleHref } from '@remix-run/css-bundle'
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

/*
google fonts, move the whole shebang somewhere else
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Poppins&display=swap" rel="stylesheet">

font-family: 'Open Sans', sans-serif;
font-family: 'Poppins', sans-serif;
*/
import stylesheet from '~/style.css'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
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
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <PayPalScriptProvider
          options={{ clientId: clientId, currency: 'HUF', intent: 'capture' }}
        >
          <Outlet />
        </PayPalScriptProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
