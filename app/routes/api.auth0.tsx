/* auth action, on POST authenticate, on GET return to root */
import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	redirect,
} from '@remix-run/node'
import { authenticator } from '~/services/session.server'

/* redirect back to the website if anyone tries to GET to this path */
export const loader = async ({ request }: LoaderFunctionArgs) => {
	return redirect('/')
}

/* initialize login process, call this from a form from the website */
export const action = async ({ request }: ActionFunctionArgs) => {
	return authenticator.authenticate('auth0', request)
}
