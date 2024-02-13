import { LoaderFunctionArgs, json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import React from 'react'
import { authenticator } from '~/services/session.server'

export async function loader({ request }: LoaderFunctionArgs) {
	const user = await authenticator.isAuthenticated(request)

	return json({ user })
}

const LoginPage = () => {
	const { user } = useLoaderData<typeof loader>()

	return (
		<div>
			<pre>{JSON.stringify(user, null, 2)}</pre>

			<Form action="/api/auth0" method="post">
				<button>Login with Auth0</button>
			</Form>
		</div>
	)
}

export default LoginPage
