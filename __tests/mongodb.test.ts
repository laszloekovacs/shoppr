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
	it('tries to use $inc operation on a boolean, it rejects $inc', async () => {
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

	it('increases a keys value - $inc', async () => {
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

	it('is able to unset unwanted fields - $unset', async () => {
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

	it('pushes into an array - $push', async () => {
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

	it('can push more than one item into an array - $push', async () => {
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

	it('adds to a set - $addToSet, $ne, $each', async () => {
		const data = {
			name: 'steeve',
			favorites: {
				books: ['one', 'two'],
			},
		}

		await collection.insertOne(data)

		await collection.updateOne(
			{ 'favorites.books': { $ne: 'three' } },
			{
				$addToSet: { 'favorites.books': { $each: ['three', 'five'] } },
			}
		)

		await collection.updateOne(
			{
				'favorites.books': { $ne: 'four' },
			},
			{
				$push: {
					'favorites.books': 'four',
				},
			}
		)

		const result = await collection.findOne({ name: 'steeve' })

		expect(result?.favorites.books).toContain('three')
		expect(result?.favorites.books).toContain('four')
	})

	it('pops out one element - $pop', async () => {
		const data = {
			tasks: ['dishes', 'laundry', 'cooking'],
		}

		await collection.insertOne(data)

		await collection.updateOne(
			{},
			{
				$pull: { tasks: 'dishes' },
			}
		)

		// pop last element
		await collection.updateOne(
			{},
			{
				$pop: { tasks: -1 },
			}
		)

		const result = await collection.findOne<typeof data>({})

		expect(result?.tasks).not.toContain('dishes')
		expect(result?.tasks).toHaveLength(1)
	})

	it('can use indexing into arrays, uses array match $ op', async () => {
		const data = {
			content: 'the content',
			comments: [
				{
					comment: 'good post',
					author: 'John',
					votes: 0,
				},
				{
					comment: 'i thought it was too short',
					author: 'Claire',
					votes: 3,
				},
				{
					comment: 'free watches',
					author: 'Alice',
					votes: -5,
				},
				{
					comment: 'vacation getaways',
					author: 'Lynn',
					votes: -7,
				},
			],
		}

		await collection.insertOne(data)

		// increment blog post vote by index
		await collection.updateOne(
			{ content: 'the content' },
			{
				$inc: { 'comments.0.votes': 1 },
			}
		)

		// increment by finding the author
		await collection.updateOne(
			{ 'comments.author': 'Lynn' },
			{ $set: { 'comments.$.votes': 10 } }
		)

		const result = await collection.findOne<typeof data>({})

		expect(result?.comments[3].votes).toBe(10)
		expect(result?.comments[0].votes).toBe(1)
	})

	it('uses array filter - arrayFilter', async () => {
		const data = {
			posts: [
				{
					text: 'ok',
					votes: 6,
				},
				{
					text: 'hide',
					votes: -7,
				},
			],
		}

		await collection.insertOne(data)

		await collection.updateOne(
			{},
			{
				$set: { 'posts.$[elem].hidden': true },
			},
			{
				arrayFilters: [{ 'elem.votes': { $lte: -5 } }],
			}
		)

		const result = await collection.findOne({})

		expect(result?.posts[1]?.hidden).toBe(true)
		//
	})

	it('inserts when it isnt found in the database', async () => {
		const result = await collection.updateOne(
			{ url: 'blog' },
			{ $inc: { pageviews: 1 } },
			{ upsert: true }
		)

		expect(result.upsertedCount).toBe(1)
	})

	it('sets only on creation', async () => {
		const result = await collection.updateOne(
			{},
			{ $setOnInsert: { createdAt: new Date() } },
			{ upsert: true }
		)

		expect(result.upsertedCount).toBe(1)
	})

	// end
})
