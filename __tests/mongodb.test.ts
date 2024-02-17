import { Collection, Db } from 'mongodb'
import { MongoClient } from 'mongodb'

describe('mongodb queries', () => {
	let client: MongoClient
	let collection: Collection<any>

	it('works', () => {
		expect(true).toBe(true)
	})

	beforeAll(async () => {
		client = new MongoClient('mongodb://localhost:27017')
		await client.connect()
		const db = client.db('test')
		collection = db.collection('test')
	})

	afterAll(async () => {
		await client.close()
	})

	afterEach(async () => {
		await client.db('test').dropDatabase()
	})

	it('can connect to test database', async () => {
		const data = {
			name: 'test',
		}

		await collection.insertOne(data)

		const result = await collection.findOne(data)
		expect(result).toBeTruthy()
	})

	it('can insert many', async () => {
		const data = [{ name: 'test1' }, { name: 'test2' }]

		const result = await collection.insertMany(data, { ordered: false })

		expect(result.acknowledged).toBe(true)
	})

	it('deletes one', async () => {
		const data = [
			{ name: 'one' },
			{ name: 'two' },
			{ name: 'three' },
			{ name: 'four' },
		]

		await collection.insertMany(data, { ordered: true })

		const result = await collection.deleteOne({ name: 'four' })

		expect(result.deletedCount).toBe(1)
	})

	it('deletes many', async () => {
		const data = [
			{ name: 'one' },
			{ name: 'two' },
			{ name: 'deleteme' },
			{ name: 'deleteme' },
		]

		await collection.insertMany(data, { ordered: true })

		const result = await collection.deleteMany({ name: 'deleteme' })

		expect(result.deletedCount).toBe(2)
	})

	it('increases a keys value', async () => {
		const data = {
			url: 'test',
			count: 0,
		}

		await collection.insertOne(data)

		const result = await collection.updateOne(
			{ url: 'test' },
			{
				$inc: { 'stats.count': 1 },
			}
		)

		expect(result).toMatchInlineSnapshot(`
			{
			  "acknowledged": true,
			  "matchedCount": 1,
			  "modifiedCount": 1,
			  "upsertedCount": 0,
			  "upsertedId": null,
			}
		`)
		expect(result.modifiedCount).toBe(1)
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
