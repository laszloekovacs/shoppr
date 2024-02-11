import { Form, json, useLoaderData } from '@remix-run/react'
import { DATABASE } from '~/services/constants.server'
import { mongodb } from '~/services/db.server'

export const loader = async () => {
	const db = await mongodb.db(DATABASE)
	const collection = await db.collection('departments')
	const departments = await collection.find({}).toArray()

	return json({ departments })
}

const DepartmentPage = () => {
	const { departments } = useLoaderData<typeof loader>()

	return (
		<div>
			<h2>Categories</h2>
			<hr />
			<Form action="/dashboard/departments/new" method="post">
				<input type="text" name="name" />
				<input type="text" name="brand" />
				<input type="submit" value="Submit" />
			</Form>
			<hr />
			<ul>
				{departments.map((department) => (
					<li key={department._id}>
						<h3>{department.name}</h3>
						<p>{department.brand}</p>
					</li>
				))}
			</ul>
		</div>
	)
}

export default DepartmentPage
