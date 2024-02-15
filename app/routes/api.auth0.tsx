/* auth action, on POST authenticate, on GET return to root */
import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	redirect,
} from '@remix-run/node'
import { authenticator } from '~/services/session.server'

/* redirect back to the website if anyone tries to GET to this path */
export const loader = async ({ request }: LoaderFunctionArgs) => {
	console.log('you should not GET to this path')
	return redirect('/')
}

/* 
initialize login process, call this from a form from the website 
it does not return here. will go to callback, set redirection over there
*/
export const action = async ({ request }: ActionFunctionArgs) => {
	await authenticator.authenticate('auth0', request)
}
