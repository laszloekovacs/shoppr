import { LoaderFunction, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import React from 'react'
import { auth } from '../services/auth.server'

/* renders a login button if logged out, otherwise displays the account menu */

export const loader: LoaderFunction = async ({ request }) => {
  return json({ profile: await auth.isAuthenticated(request) })
}

const Session = () => {
  const { profile } = useLoaderData<typeof loader>()
  return (
    <section id="session">
      <div></div>
    </section>
  )
}

export default Session
