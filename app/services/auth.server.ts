import { createCookieSessionStorage } from '@remix-run/node'
import { Authenticator } from 'remix-auth'
import type { Auth0Profile } from 'remix-auth-auth0'
import { Auth0Strategy } from 'remix-auth-auth0'

import {
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN,
  AUTH0_CALLBACK_URI,
  SECRETS,
} from '~/constants/index.server'

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'shoppr_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secrets: [SECRETS],
    secure: process.env.NODE_ENV === 'production',
  },
})

export const auth = new Authenticator<Auth0Profile>(sessionStorage)

const auth0Strategy = new Auth0Strategy(
  {
    callbackURL: AUTH0_CALLBACK_URI,
    clientID: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    domain: AUTH0_DOMAIN,
  },
  async ({ profile }) => {
    // verify
    console.log('verifying')
    return profile
  }
)

auth.use(auth0Strategy)

export const { commitSession, getSession, destroySession } = sessionStorage
