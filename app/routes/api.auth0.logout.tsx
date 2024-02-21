// app/routes/auth/logout.ts
import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { constants } from '~/services/constants.server'
import { destroySession, getSession } from '~/services/session.server'

export const action = async ({ request }: ActionFunctionArgs) => {
	const { AUTH0_LOGOUT_URL, AUTH0_CLIENT_ID } = constants

	const session = await getSession(request.headers.get('Cookie'))
	const logoutURL = new URL(AUTH0_LOGOUT_URL!) // i.e https://YOUR_TENANT.us.auth0.com/v2/logout

	logoutURL.searchParams.set('client_id', AUTH0_CLIENT_ID!)
	logoutURL.searchParams.set('returnTo', '/')

	return redirect(logoutURL.toString(), {
		headers: {
			'Set-Cookie': await destroySession(session),
		},
	})
}
