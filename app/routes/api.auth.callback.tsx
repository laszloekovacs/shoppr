import {
  redirect,
  type ActionFunction,
  type LoaderFunction,
} from '@remix-run/node'
import { getSession, commitSession } from '~/services/session.server'
import jwt from 'jsonwebtoken'
import chalk from 'chalk'

const prefix = chalk.bgYellowBright('[AUTH] ')

/* oauth redirects to here, posts the token in a form */
export const action: ActionFunction = async ({ request }) => {
  /* unpack and check if theres a token POSTed in the form */
  const form = await request.formData()
  const token = form.get('id_token')
  const state = form.get('state')

  console.log(prefix, { token, state })

  if (!token || !state) {
    throw new Error('Missing token or state')
  }

  /* verify the token, use the jwks_uri to get the public key */
  //jwt.verify(token.toString(), config.jwks_uri)

  // for now, set the token in the session

  const session = await getSession(request.headers.get('Cookie'))

  const data = { token: token.toString() }

  // create a redirect so we don't end up in the loader below, while also setting the session cookie
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

// should never be called, if someone stumbles on the route, redirect him home
export const loader: LoaderFunction = async (args) => {
  return redirect('/')
}
