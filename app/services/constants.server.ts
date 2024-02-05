import 'dotenv/config'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
	throw new Error(
		'Please define the MONGODB_URI environment variable inside .env.local'
	)
}

const DB = process.env.DB!

if (!DB) {
	throw new Error('Please define the DB environment variable inside .env.local')
}

export { MONGODB_URI, DB }
