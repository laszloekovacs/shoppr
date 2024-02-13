import { Form } from '@remix-run/react'
import React from 'react'

const LoginPage = () => {
	return (
		<div>
			<Form action="/api/auth0" method="post">
				<button>Login with Auth0</button>
			</Form>
		</div>
	)
}

export default LoginPage
