/* eslint-disable no-var */
import { MongoClient, BSON } from 'mongodb'
export type { WithId } from 'mongodb'

const DATABASE = process.env.DATABASE as string | ''

if (!DATABASE) {
	throw new Error('Missing DATABASE environment variable')
}

const connectionString: string = process.env.CONNECTION_STRING as string | ''
if (!connectionString) {
	throw new Error('Missing CONNECTION_STRING environment variable')
}

let mongodb: MongoClient

/* extend global type, cant use let or const, var gets complains */
declare global {
	var __db: MongoClient | undefined
}

if (process.env.NODE_ENV === 'production') {
	mongodb = new MongoClient(connectionString)
} else {
	if (!global.__db) {
		global.__db = new MongoClient(connectionString)
	}
	mongodb = global.__db
}

let ObjectId: BSON.ObjectId

export { mongodb, ObjectId, DATABASE }
