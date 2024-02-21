import { createCookieSessionStorage } from '@remix-run/node'
import { Authenticator } from 'remix-auth'
import { Auth0Strategy } from 'remix-auth-auth0'
import type { Auth0Profile } from 'remix-auth-auth0'
import { constants } from './constants.server'

const {
	AUTH0_CLIENT_ID,
	AUTH0_CALLBACK_URL,
	AUTH0_CLIENT_SECRET,
	AUTH0_DOMAIN,
} = constants

/*
https://github.com/remix-run/examples/blob/main/remix-auth-auth0/app/routes/logout.tsx
https://github.com/sergiodxa/remix-auth
https://github.com/danestves/remix-auth-auth0/tree/main
*/

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: 'shoppr__session',
		sameSite: 'lax',
		path: '/',
		httpOnly: true,
		secrets: ['s3cr3t'],
		secure: process.env.NODE_ENV === 'production',
	},
})

const auth0Strategy = new Auth0Strategy(
	{
		clientID: AUTH0_CLIENT_ID!,
		callbackURL: AUTH0_CALLBACK_URL!,
		clientSecret: AUTH0_CLIENT_SECRET!,
		domain: AUTH0_DOMAIN!,
	},
	async ({ profile }) => {
		// verify function
		return profile
	}
)
export const authenticator = new Authenticator<Auth0Profile>(sessionStorage)
authenticator.use(auth0Strategy, 'auth0')

export const { getSession, commitSession, destroySession } = sessionStorage
