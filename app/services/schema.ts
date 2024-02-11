export const productSchema = {
	$jsonSchema: {
		bsonType: 'object',
		required: ['name', 'brand'],
		properties: {
			name: {
				bsonType: 'string',
				description: 'must be a string and is required',
			},
			brand: {
				bsonType: 'string',
				description: 'must be a string and is required',
			},
		},
	},
}
