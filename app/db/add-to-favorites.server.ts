import { ObjectId } from 'mongodb'
import { Auth0Profile } from 'remix-auth-auth0'
import { documents } from '~/services/db.server'

export default async function addToFavorites(user: Auth0Profile, name: string) {
	await documents('accounts').updateOne(
		{ user: user.id },
		{
			$push: { cart: { name } },
		}
	)

	console.log('added to cart')
}
