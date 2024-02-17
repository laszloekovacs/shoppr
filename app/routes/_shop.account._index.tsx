import { LoaderFunctionArgs, json, redirect } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { authenticator } from '~/services/session.server'
import { Text } from '../components/primitives/text'
import { Flex } from '~/components/primitives/flexbox'

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
		<Flex dir="row">
			<div>
				{user._json?.picture && <img src={user._json?.picture} width={45} />}
			</div>
			<Text fontSize="4xl">
				Üdvözlünk, {user?.name?.givenName || user?.displayName}
			</Text>
		</Flex>
	)
}
