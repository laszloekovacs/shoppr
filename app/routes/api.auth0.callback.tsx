import { LoaderFunctionArgs, redirect } from '@remix-run/node'
import { authenticator } from '~/services/session.server'

/* this will be called by Auth0, it should not return, but will redirect */
export const loader = async ({ request }: LoaderFunctionArgs) => {
	await authenticator.authenticate('auth0', request, {
		successRedirect: '/register',
		failureRedirect: '/login',
	})
}
