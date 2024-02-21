import { MongoClient } from 'mongodb'
import { singleton } from './singleton.server'

export const mongodb = singleton(
	'mongodb',
	() => new MongoClient(process.env.CONNECTION_STRING!)
)

export const db = {
	products: mongodb.db(process.env.DATABASE!).collection('products'),
	orders: mongodb.db(process.env.DATABASE!).collection('orders'),
	attributes: mongodb.db(process.env.DATABASE!).collection('attributes'),
	accounts: mongodb.db(process.env.DATABASE!).collection('accounts'),
}
