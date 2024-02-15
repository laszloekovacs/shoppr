import { LoaderFunctionArgs, json, redirect } from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import { authenticator } from '~/services/session.server'

export const handle = {
	breadcrumb: () => <Link to="/login">Some Route</Link>,
}

export async function loader({ request }: LoaderFunctionArgs) {
	const user = await authenticator.isAuthenticated(request)

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
