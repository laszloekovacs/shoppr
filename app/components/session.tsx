import { LoaderFunction, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import React from 'react'
import { auth } from '../services/auth.server'

/* renders a login button if logged out, otherwise displays the account menu */

export const loader: LoaderFunction = async ({ request }) => {
    const profile = await auth.isAuthenticated(request)

    return json({ profile })
}

const Session = () => {
    const data = useLoaderData<typeof loader>()
    return (
        <section id="session">
            <div>
                <h2>hello</h2>
                {data && <pre>{JSON.stringify(data.profile, null, 2)}</pre>}
            </div>
        </section>
    )
}

// <Login />
export default Session
