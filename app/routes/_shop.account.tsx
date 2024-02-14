import { LoaderFunctionArgs, json, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { authenticator } from '~/services/session.server'

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const user = await authenticator.isAuthenticated(request)

	// TODO: sould inform the user what happened
	if (!user) {
		return redirect('/login')
	}

	// TODO: return name, etc
	return json({ user })
}

export default function AccountPage() {
	const { user } = useLoaderData<typeof loader>()

	return (
		<div>
			<h1>
				Üdvözlünk,{' '}
				{user?.name?.givenName ||
					user._json?.preferred_username ||
					user._json?.nickname ||
					user?.displayName}
			</h1>

			{user._json?.picture && <img src={user._json?.picture} width={45} />}

			<pre>{JSON.stringify(user, null, 2)}</pre>
		</div>
	)
}
