import { Form } from '@remix-run/react'
import React from 'react'
import { Auth0Profile } from 'remix-auth-auth0'
import invariant from 'tiny-invariant'

const AccoutMenu = ({ session }: { session: Auth0Profile }) => {
  return (
    <>
      <Form method="post" className="flex flex-row">
        <p>{session && session.displayName}</p>
        {session && session.photos && (
          <img width="50px" src={session.photos[0].value} />
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
      {session ? <AccoutMenu session={session} /> : <LoginButton />}
    </div>
  )
}

export default Header
