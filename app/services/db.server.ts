/* eslint-disable no-var */
import { MongoClient, BSON } from 'mongodb'
export type { WithId } from 'mongodb'
export { MongoServerError } from 'mongodb'
const DATABASE = process.env.DATABASE as string | ''

if (!DATABASE) {
	throw new Error('Missing DATABASE environment variable')
}

const CONNECTION_STRING: string = process.env.CONNECTION_STRING as string | ''
if (!CONNECTION_STRING) {
	throw new Error('Missing CONNECTION_STRING environment variable')
}

let mongodb: MongoClient

export const documents = (
	name: 'products' | 'orders' | 'attributes' | 'accounts'
) => mongodb.db(DATABASE).collection(name)

/* extend global type, cant use let or const, var gets complains */
declare global {
	var __db: MongoClient | undefined
}

if (process.env.NODE_ENV === 'production') {
	mongodb = new MongoClient(CONNECTION_STRING)
} else {
	if (!global.__db) {
		global.__db = new MongoClient(CONNECTION_STRING)
	}
	mongodb = global.__db
}

export { mongodb, DATABASE }
