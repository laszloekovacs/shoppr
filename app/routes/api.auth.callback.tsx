import {
  redirect,
  type ActionFunction,
  type LoaderFunction,
} from '@remix-run/node'
import { getSession, commitSession } from '~/services/session.server'
import jwt from 'jsonwebtoken'
import { config } from './api.auth.login'

/* oauth redirects to here, posts the token in a form */
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()

  const token = form.get('id_token')
  const state = form.get('state')

  console.log({ token, state })

  if (!token || !state) {
    throw new Error('Missing token or state')
  }

  //jwt.verify(token.toString(), config.jwks_uri)

  // for now, set the token in the session

  const session = await getSession(request.headers.get('Cookie'))

  const data = { token: token.toString() }

  const response = new Response(null, {
    headers: {
      'Set-Cookie': await commitSession(session),
      'Content-Type': 'application/json',
      Location: '/',
    },
    status: 302,
  })

  return response
}

export const loader: LoaderFunction = async (args) => {
  // get the hash
  console.log('args', args)

  return JSON.stringify({ ok: 'cool' })
}
