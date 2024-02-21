import { json, redirect, type LoaderFunctionArgs } from '@remix-run/node'
import { Form, Link, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import RawData from '~/components/raw-data'
import { db } from '~/services/db.server'
import { authenticator } from '~/services/session.server'

export async function loader({ request }: LoaderFunctionArgs) {
	const user = await authenticator.isAuthenticated(request)

	const account = await db.accounts.findOne({ user: user?.id })

	if (account) {
		return redirect('/account')
	}

	if (user) {
		return json({ user })
	} else {
		throw new Error('failed to fetch user')
	}
}

export default function RegisterPage() {
	const { user } = useLoaderData<typeof loader>()

	return (
		<div>
			<h1>Új fiók regisztrálása</h1>
			<h2>Szia, {user?.name?.givenName || user.displayName}!</h2>
			<p>rendszerünkben nem találtuk meg a fiókod, szeretnél regisztrálni?</p>
			<Form method="POST">
				<input type="hidden" name="id" value={user.id} />

				<button type="submit" name="intent" value="REGISTER">
					fiók létrehozása
				</button>
			</Form>
			<Link to="/api/auth0/logout">inkább nem</Link>
		</div>
	)
}

export async function action({ request }: LoaderFunctionArgs) {
	invariant(request, 'request is required')

	const formData = await request.formData()

	const id = formData.get('id') as string

	await db.accounts.insertOne({ user: id })

	return redirect('/account')
}
