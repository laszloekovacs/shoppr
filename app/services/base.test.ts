import { expect, it, describe } from 'vitest'
import { mongoClient } from './mongo.server'


describe('base', () => {
	it('should be true', () => {
		expect(true).toBe(true)
	})
})

describe('database connection', () => {
	it('should be true', () => {
		const db = mongoClient.db('test')

		expect(db).not.toBeFalsy()
	})
})
