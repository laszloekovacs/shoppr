import { MONGODB_URI, DB } from './constants.server'
import { MongoClient } from 'mongodb'

// schema

export interface Product {
	name: string
	price: number
}

// create new product
export const mongoInsertProduct = async (product: Product) => {
	const client = new MongoClient(MONGODB_URI)

	try {
		// connect, get the database and collection
		const database = client.db(DB)
		const products = database.collection<Product>('products')

		// make sure name is unique
		products.createIndex({ name: 1 }, { unique: true })

		// insert
		const result = await products.insertOne(product)

		if (result.insertedId !== undefined) {
			console.log('Product inserted with ID:', result.insertedId)
		}

		return result
	} catch (error) {
		console.log(error)
	} finally {
		await client.close()
	}
}

export const mongoFindProductByName = async (name: string) => {
	const client = new MongoClient(MONGODB_URI)

	try {
		// connect, get the database and collection
		const database = client.db(DB)
		const products = database.collection<Product>('products')

		// find
		const result = await products.findOne({ name })

		return result
	} catch (error) {
		console.log(error)
	} finally {
		await client.close()
	}
}
