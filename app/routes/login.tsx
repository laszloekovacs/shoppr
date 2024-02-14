import { LoaderFunctionArgs, json, redirect } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { authenticator } from '~/services/session.server'

export async function loader({ request }: LoaderFunctionArgs) {
	const user = await authenticator.isAuthenticated(request)

	// user already signed in, send him back home
	if (user) {
		return redirect('/')
	}

	return {}
}

const LoginPage = () => {
	return (
		<div>
			<h1>Bejelentkezés</h1>
			<p>Jelentkezz be auth0-val, meglévő google vagy github fiókoddal</p>
			<Form action="/api/auth0" method="post">
				<button>Login with Auth0</button>
			</Form>
		</div>
	)
}

export default LoginPage
