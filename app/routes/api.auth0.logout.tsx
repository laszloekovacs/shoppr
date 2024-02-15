// app/routes/auth/logout.ts
import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { destroySession, getSession } from '~/services/session.server'

export const action = async ({ request }: ActionFunctionArgs) => {
	console.log('logging out')

	const session = await getSession(request.headers.get('Cookie'))
	const logoutURL = new URL(process.env.AUTH0_LOGOUT_URL as string) // i.e https://YOUR_TENANT.us.auth0.com/v2/logout

	logoutURL.searchParams.set('client_id', process.env.AUTH0_CLIENT_ID as string)
	logoutURL.searchParams.set('returnTo', '/')

	return redirect(logoutURL.toString(), {
		headers: {
			'Set-Cookie': await destroySession(session),
		},
	})
}
