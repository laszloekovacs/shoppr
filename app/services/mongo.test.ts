import { expect, it, describe } from 'vitest'
import {
	mongoFindProductByName,
	mongoInsertProduct,
	type Product,
} from './mongo.server'

describe('database', () => {
	it.skip('should be able to insert', async () => {
		const product = {
			name: 'test',
			price: 100,
		} satisfies Product

		const result = await mongoInsertProduct(product)

		expect(result).toBeTruthy()
	})

	it('find by name', async () => {
		const name = 'test'

		const result = await mongoFindProductByName(name)

		expect(result).toBeTruthy()
		expect(result?.name).toMatch(name)
	})
})
