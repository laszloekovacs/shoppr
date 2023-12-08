import { Form, Link } from '@remix-run/react'
import React from 'react'
import { Auth0Profile } from 'remix-auth-auth0'
import invariant from 'tiny-invariant'

const AccoutMenu = ({ session }: { session: Auth0Profile }) => {
    return (
        <>
            <Form method="post" className="flex flex-row gap-2">
                <span>{session && session.displayName}</span>
                {session && session.photos && (
                    <img width="40px" src={session.photos[0].value} />
                )}
            </Form>
        </>
    )
}
const LoginButton = () => (
    <Form method="post" action="/api/auth/login">
        <button>Sign In with Auth0</button>
    </Form>
)

const Header = ({ session }: { session: Auth0Profile | null }) => {
    return (
        <div className="p-2 flex justify-between">
            <Link to="/">
                <h1 className="text-3xl">Shoppr</h1>
            </Link>
            {session ? <AccoutMenu session={session} /> : <LoginButton />}
        </div>
    )
}

export default Header
