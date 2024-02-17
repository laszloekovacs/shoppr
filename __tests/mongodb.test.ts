import { Db } from 'mongodb'
import { MongoClient } from 'mongodb'

describe('mongodb queries', () => {
	let client: MongoClient

	it('works', () => {
		expect(true).toBe(true)
	})

	beforeAll(async () => {
		client = new MongoClient('mongodb://localhost:27017')
	})

	afterAll(async () => {
		await client.close()
	})

	afterEach(async () => {
		await client.db('test').dropDatabase()
	})

	it('can connect to test database', async () => {
		await client.connect()
		const db = client.db('test')
		const collection = db.collection('test')

		const data = {
			name: 'test',
		}

		await collection.insertOne(data)
		const result = await collection.findOne(data)
		expect(result).toBeTruthy()
	})

	it.skip('can insert array element if present or remove when missing', async () => {
		await client.connect()
		const db = client.db('test')
		const collection = db.collection('test')

		const initialState = {
			name: 'test',
			favorites: [
				{
					name: 'first',
				},
				{
					name: 'second',
				},
				{
					name: 'third',
				},
			],
		}

		await collection.insertOne(initialState)

		// insert missing 'fourth'
	})
})
