import { expect, it, describe } from 'vitest'
import { createProduct, type Product } from './mongo.server'

describe('base', () => {
	it('should be able to insert', async () => {
		const product = {
			name: 'test',
			price: 100,
		} satisfies Product

		const result = await createProduct(product)

		expect(result).toBeTruthy()
	})
})
