import React from 'react'
import { Form } from '@remix-run/react'
import { PayPalButtons } from '@paypal/react-paypal-js'

const login = () => {
  return (
    <Form method="post" action="/api/auth/login">
      <button>Sign In with Auth0</button>
    </Form>
  )
}

export default login
