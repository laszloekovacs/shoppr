import { MongoClient } from 'mongodb'
import { productSchema } from './schema'

const { MONGODB_URI, MONGO_DATABASE } = process.env
if (!MONGODB_URI || !MONGO_DATABASE) {
	throw new Error(
		'Please define the MONGODB_URI, MONGO_DATABASE environment variable inside .env.local'
	)
}

export const migrate = () => {
	const mongoClient = new MongoClient(MONGODB_URI)
	mongoClient.connect()

	const db = mongoClient.db(MONGO_DATABASE)

	db.createCollection('products', {
		validator: productSchema.$jsonSchema,
	})
}
