import {
  redirect,
  type ActionFunction,
  type LoaderFunction,
} from '@remix-run/node'
import { getSession, commitSession } from '~/services/session.server'
import chalk from 'chalk'
import { verifyOpenIDToken } from '~/services/openid.server'

const prefix = chalk.bgYellowBright('[api.auth.callback] ')

/* oauth redirects to here, posts the token in a form */
export const action: ActionFunction = async ({ request }) => {
  /* unpack and check if theres a token POSTed in the form */
  const form = await request.formData()
  const token = form.get('id_token')?.toString()
  const state = form.get('state')?.toString()

  console.log(prefix, { token, state })

  if (!token || !state) {
    throw new Error(prefix + 'Missing token or state')
  }

  // TODO: verify token
  // for now, set the token in the session

  if (!(await verifyOpenIDToken(token))) {
    throw new Error('Invalid token')
  }

  const session = await getSession(request.headers.get('Cookie'))
  session.set('token', token.toString())

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
