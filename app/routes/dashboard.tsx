import { Outlet } from '@remix-run/react'
import Navigation from '~/components/Navigation'
import SchemaForm from '~/components/SchemaForm'
import { productSchema } from '~/services/schema'

const dashboard = () => {
	return (
		<div>
			<Navigation />
			<h1>Dashboard</h1>
			<Outlet />
			<SchemaForm
				action="/dashboard/products/new"
				schema={productSchema.$jsonSchema.properties}
			/>
		</div>
	)
}

export default dashboard
