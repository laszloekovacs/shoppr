import { LoaderFunctionArgs } from '@remix-run/node'
import { authenticator } from '~/services/session.server'

/* this will be called by Auth0, register it */
export const loader = async ({ request }: LoaderFunctionArgs) => {
	return authenticator.authenticate('auth0', request, {
		successRedirect: '/',
		failureRedirect: '/',
	})
}
