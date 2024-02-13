import { createCookieSessionStorage } from '@remix-run/node'
import { Authenticator } from 'remix-auth'
import { Auth0Strategy } from 'remix-auth-auth0'
import type { Auth0Profile } from 'remix-auth-auth0'

/*
https://github.com/remix-run/examples/blob/main/remix-auth-auth0/app/routes/logout.tsx
https://github.com/sergiodxa/remix-auth
https://github.com/danestves/remix-auth-auth0/tree/main
*/

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: '__session',
		sameSite: 'lax',
		path: '/',
		httpOnly: true,
		secrets: ['s3cr3t'],
		secure: process.env.NODE_ENV === 'production',
	},
})

const auth0Strategy = new Auth0Strategy(
	{
		clientID: process.env.AUTH0_CLIENT_ID as string,
		callbackURL: process.env.AUTH0_CALLBACK_URL as string,
		clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
		domain: process.env.AUTH0_DOMAIN as string,
	},
	async ({ profile }) => {
		// verify function
		return profile
	}
)
export const authenticator = new Authenticator<Auth0Profile>(sessionStorage)
authenticator.use(auth0Strategy, 'auth0')

export const { getSession, commitSession, destroySession } = sessionStorage
