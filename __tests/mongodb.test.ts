import { Collection, Db } from 'mongodb'
import { MongoClient } from 'mongodb'

describe('mongodb queries', () => {
	let client: MongoClient
	let collection: Collection<any>

	it('vitest is set up properly', () => {
		expect(true).toBe(true)
	})

	beforeAll(async () => {
		client = new MongoClient('mongodb://localhost:27017')
		//await client.connect()
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
		const data = {}

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

	//
	it('tries to use $inc operation on a boolean, it rejects', async () => {
		const data = {
			url: 'test',
			switcheroo: true,
		}

		await collection.insertOne(data)
		const result = collection.updateOne(
			{ url: 'test' },
			{
				$inc: { switcheroo: 1 },
			}
		)

		expect(result).rejects.toThrow(/\$inc/)
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

	it('is able to unset unwanted fields', async () => {
		const data = {
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

		await collection.insertOne(data)

		const result = await collection.updateOne(
			{
				name: 'test',
			},
			{
				$unset: {
					favorites: 1,
				},
			}
		)

		expect(result.acknowledged).toBe(true)
	})

	it('pushes into an array', async () => {
		const data = {
			name: 'star wars episode 1',
		}

		await collection.insertOne(data)

		await collection.updateOne(
			{ name: 'star wars episode 1' },
			{
				$push: {
					comments: {
						name: 'mike',
						text: 'i really like this movie',
					},
				},
			}
		)

		const result = await collection.findOne({ name: 'star wars episode 1' })

		expect(result?.comments).toHaveLength(1)
	})

	it('can push more than one item into an array', async () => {
		const data = {
			name: 'steeve',
			scores: [],
		}

		await collection.insertOne(data)

		await collection.updateOne(
			{ name: 'steeve' },
			{
				$push: {
					scores: {
						$each: [2, 3, 4],
						$slice: -6,
						$sort: { scores: -1 },
					},
				},
			}
		)

		const result = await collection.findOne({ name: 'steeve' })

		expect(result?.scores).toHaveLength(3)
		expect(result?.scores).toContain(3)
		expect(result?.scores).toEqual([2, 3, 4])
	})
})
