/* auth action, on POST authenticate, on GET return to root */
import {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	redirect,
} from '@remix-run/node'
import { authenticator } from '~/services/session.server'
import { documents } from '~/services/db.server'

/* redirect back to the website if anyone tries to GET to this path */
export const loader = async ({ request }: LoaderFunctionArgs) => {
	return redirect('/')
}

// it does not return here. see callback, duh.
/* initialize login process, call this from a form from the website */
export const action = async ({ request }: ActionFunctionArgs) => {
	console.log('logging in')
	const user = await authenticator.authenticate('auth0', request)
	console.log(user)
	/* create an account if if does not exist */
	const result = await documents('accounts').updateOne(
		{ user: user.id }, // find by user
		{ $set: { user: user.id } }, // update document if it exists
		{ upsert: true } // insert if no document matches
	)

	await documents('accounts').insertOne({
		user: user.id,
	})

	if (result.upsertedCount) {
		console.log('account created')
	}

	return user
}
