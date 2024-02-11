import { ActionFunctionArgs } from '@remix-run/node'
import { DATABASE } from '~/services/constants.server'
import { mongodb } from '~/services/db.server'

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()

	const department = {
		name: formData.get('name'),
		brand: formData.get('brand'),
	}

	const db = await mongodb.db(DATABASE)
	const collection = await db.collection('departments')

	const result = await collection.insertOne(department)

	return result
}
