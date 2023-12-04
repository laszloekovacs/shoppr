import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { auth } from '../services/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
  const profile = await auth.isAuthenticated(request, {
    failureRedirect: '/',
  })

  return json({ profile })
}

export default function Screen() {
  const { profile } = useLoaderData<typeof loader>()
  return (
    <>
      <Form method="post" action="/api/auth/logout">
        <button className="btn btn-primary btn-sm">Log Out</button>
      </Form>

      <hr />

      <pre>
        <code>{JSON.stringify(profile, null, 2)}</code>
      </pre>
    </>
  )
}
