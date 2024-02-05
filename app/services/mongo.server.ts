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

// find by name
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

// return all products
export const mongoFindAllProducts = async ({
	skip = 0,
	limit = 10,
}: {
	skip: number
	limit: number
}) => {
	const client = new MongoClient(MONGODB_URI)

	try {
		// connect, get the database and collection
		const database = client.db(DB)
		const products = database.collection<Product>('products')

		// return product array
		const result = await products.find().skip(skip).limit(limit).toArray()

		return result
	} catch (error) {
		console.log(error)
	} finally {
		await client.close()
	}
}
