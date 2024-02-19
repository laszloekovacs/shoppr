import { Collection, Db } from 'mongodb'
import { MongoClient } from 'mongodb'

describe('mongodb queries', () => {
	let client: MongoClient
	let docs: Collection<any>

	it('vitest is set up properly', () => {
		expect(true).toBe(true)
	})

	beforeAll(async () => {
		client = new MongoClient('mongodb://localhost:27017')

		const db = client.db('test')
		docs = db.collection('test')
	})

	afterAll(async () => {
		await client.close()
	})

	afterEach(async () => {
		await client.db('test').dropDatabase()
	})

	it('can connect to test database', async () => {
		const data = {}

		await docs.insertOne(data)

		const result = await docs.findOne(data)
		expect(result).toBeTruthy()
	})

	it('can insert many', async () => {
		const data = [{ name: 'test1' }, { name: 'test2' }]

		const result = await docs.insertMany(data, { ordered: false })

		expect(result.acknowledged).toBe(true)
	})

	it('deletes one', async () => {
		const data = [
			{ name: 'one' },
			{ name: 'two' },
			{ name: 'three' },
			{ name: 'four' },
		]

		await docs.insertMany(data, { ordered: true })

		const result = await docs.deleteOne({ name: 'four' })

		expect(result.deletedCount).toBe(1)
	})

	it('deletes many', async () => {
		const data = [
			{ name: 'one' },
			{ name: 'two' },
			{ name: 'deleteme' },
			{ name: 'deleteme' },
		]

		await docs.insertMany(data, { ordered: true })

		const result = await docs.deleteMany({ name: 'deleteme' })

		expect(result.deletedCount).toBe(2)
	})

	//
	it('tries to use $inc operation on a boolean, it rejects $inc', async () => {
		const data = {
			url: 'test',
			switcheroo: true,
		}

		await docs.insertOne(data)
		const result = docs.updateOne(
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

		await docs.insertOne(data)

		const result = await docs.updateOne(
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

		await docs.insertOne(data)

		const result = await docs.updateOne(
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

		await docs.insertOne(data)

		await docs.updateOne(
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

		const result = await docs.findOne({ name: 'star wars episode 1' })

		expect(result?.comments).toHaveLength(1)
	})

	it('can push more than one item into an array - $push', async () => {
		const data = {
			name: 'steeve',
			scores: [],
		}

		await docs.insertOne(data)

		await docs.updateOne(
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

		const result = await docs.findOne({ name: 'steeve' })

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

		await docs.insertOne(data)

		await docs.updateOne(
			{ 'favorites.books': { $ne: 'three' } },
			{
				$addToSet: { 'favorites.books': { $each: ['three', 'five'] } },
			}
		)

		await docs.updateOne(
			{
				'favorites.books': { $ne: 'four' },
			},
			{
				$push: {
					'favorites.books': 'four',
				},
			}
		)

		const result = await docs.findOne({ name: 'steeve' })

		expect(result?.favorites.books).toContain('three')
		expect(result?.favorites.books).toContain('four')
	})

	it('pops out one element - $pop', async () => {
		const data = {
			tasks: ['dishes', 'laundry', 'cooking'],
		}

		await docs.insertOne(data)

		await docs.updateOne(
			{},
			{
				$pull: { tasks: 'dishes' },
			}
		)

		// pop last element
		await docs.updateOne(
			{},
			{
				$pop: { tasks: -1 },
			}
		)

		const result = await docs.findOne<typeof data>({})

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

		await docs.insertOne(data)

		// increment blog post vote by index
		await docs.updateOne(
			{ content: 'the content' },
			{
				$inc: { 'comments.0.votes': 1 },
			}
		)

		// increment by finding the author
		await docs.updateOne(
			{ 'comments.author': 'Lynn' },
			{ $set: { 'comments.$.votes': 10 } }
		)

		const result = await docs.findOne<typeof data>({})

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

		await docs.insertOne(data)

		await docs.updateOne(
			{},
			{
				$set: { 'posts.$[elem].hidden': true },
			},
			{
				arrayFilters: [{ 'elem.votes': { $lte: -5 } }],
			}
		)

		const result = await docs.findOne({})

		expect(result?.posts[1]?.hidden).toBe(true)
		//
	})

	it('inserts when it isnt found in the database', async () => {
		const result = await docs.updateOne(
			{ url: 'blog' },
			{ $inc: { pageviews: 1 } },
			{ upsert: true }
		)

		expect(result.upsertedCount).toBe(1)
	})

	it('sets only on creation', async () => {
		const result = await docs.updateOne(
			{},
			{ $setOnInsert: { createdAt: new Date() } },
			{ upsert: true }
		)

		expect(result.upsertedCount).toBe(1)
	})

	it('sets one document and returns it before updating', async () => {
		const data = {
			status: 'READY',
		}

		await docs.insertOne(data)

		const result = await docs.findOneAndUpdate(
			{ status: 'READY' },
			{
				$set: { status: 'IN_PROGRESS' },
			}
		)

		const after = await docs.findOne({})

		expect(result?.status).toBe('READY')
		expect(after?.status).toBe('IN_PROGRESS')
	})

	it('updates with $currentDate', async () => {
		const data = {
			status: 'a',
			lastModified: new Date('2013-10-10:10:10.98Z'),
		}

		await docs.insertOne(data)

		const result = await docs.findOneAndUpdate(
			{},
			{
				$currentDate: {
					// @ts-ignore
					lastModified: true,
					// @ts-ignore

					'cancellation.date': { $type: 'timestamp' },
				},
				$set: {
					'cancellation.reason': 'user request',
					status: 'b',
				},
			}
		)
		// @ts-ignore
		expect(result?.lastModified).not.toBeNull()
	})

	it.skip('does vairous things', async () => {
		// find someone with a date before 2013-10-10:10:10.98Z
		docs.find({ registeres: { $lte: new Date('2013-10-10:10:10.98Z') } })

		// age between 18 and 35
		docs.find({ age: { $gt: 18, $lt: 35 } })

		// anyone but joe
		docs.find({ name: { $ne: 'joe' } })

		// find winning tickets, ticket is one of the listed values
		docs.find({ ticket_no: { $in: [12, 22, 23, 'winner'] } })

		// non winners
		docs.find({ ticket_no: { $nin: [12, 22, 23, 'winner'] } })

		// or operator. ticket num above 12 or winner key
		docs.find({ $or: [{ ticket: { $gt: 12 } }, { ticket: 'winner' }] })

		// $not meta operator
		docs.find({ id_num: { $not: { $mod: [5, 3] } } })

		// null matches null or keys that does not exist
		docs.find({ 'does.not.exists.or.is.set.to.null': null })

		// if you want only match keys that are null but still exists
		docs.find({ somekey: null, $exists: true })

		// can use regular expressions too
		docs.find({ name: /joe/i })
		docs.find({ name: { $regex: /joe/i } })
	})

	it.skip('querying arrays', async () => {
		// will match element
		docs.insertOne({ fruits: ['banana', 'apple', 'orange'] })
		docs.find({ fruit: 'orange' })

		// match all elements, both banan and orange in the array
		docs.find({ fruit: { $all: ['banana', 'orange'] } })

		// exact array match. strictly equal array, order does not matter
		docs.find({ fruits: ['apple', 'banana', 'orange'] })

		// specific element in the array, use index, zero based
		docs.find({ 'fruit.2': 'peach' })

		// query for array size, returns documents where fruits length is 3
		docs.find({ fruits: { $size: 3 } })
		// this does not work apparently, size cannot be combined with other operators
		docs.find({ fruits: { $size: { $gt: 3 } } })
		// instead store the size and increment it when pushing into array
		docs.updateOne({}, { $push: { fruit: 'strawberry' }, $inc: { size: 1 } })
		// then query it with
		docs.find({ size: { $gt: 3 } })

		// slice - return subset of an array -10 slices from the end
		docs.findOne({ comments: { $slice: 10 } })
		// or skip / limit
		docs.findOne({ comments: { $slice: [12, -3] } })

		// TODO FIX: matching array element operator $, returns the document with first matched comment
		//docs.find({ 'comments.name': 'bob' }, { 'comments.$': 1 })

		// element match this wont work, will match all array elements, only works if x is !array
		docs.find({ x: { $gt: 10, $lt: 20 } })

		// use this instead, wont match non array elements
		docs.find({ x: { $elemMatch: { $gt: 10, $lt: 20 } } })
	})

	it.skip('subdocument queries', async () => {
		const user = {
			name: {
				first: 'Joe',
				last: 'Schmoe',
			},
			age: 30,
			comments: [{ author: 'joe', score: 4 }],
		}

		// only finds document when subdocument has exact shape of the object in the query,
		// if middlename is added, it wont match anymore
		docs.find({ name: { first: 'Joe', last: 'Schmoe' } })
		// use dot notation instead
		docs.find({ 'name.first': 'joe', 'name.last': 'Schmoe' })

		// use elem match to group criteria for subdocuments
		docs.find({
			comments: {
				$elemMatch: {
					author: 'joe',
					score: { $gt: 5 },
				},
			},
		})
	})

	// end
})
