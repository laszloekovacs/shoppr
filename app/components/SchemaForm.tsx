import { productSchema } from '~/services/schema'
import { useFetcher } from '@remix-run/react'

/* create form from schema */
const SchemaForm = ({
	action,
	schema,
}: {
	action: string
	schema: typeof productSchema.$jsonSchema.properties
}) => {
	const fetcher = useFetcher()

	return (
		<div>
			<h2>Schema Form</h2>
			<fetcher.Form method="post" action={action}>
				{Object.keys(schema).map((key) => (
					<div key={key}>
						{key}: <input name={key} type="text" />
					</div>
				))}
				<input type="submit" value="Submit" />
			</fetcher.Form>
		</div>
	)
}

export default SchemaForm
