import React from 'react'
import { Form } from '@remix-run/react'

const login = () => {
  return (
    <Form method="post" action="/api/auth/login">
      <button className="btn btn-primary btn-sm">Sign In with Auth0</button>
    </Form>
  )
}

export default login
