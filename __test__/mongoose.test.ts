/**
 * @jest-environment node
 */
import mongoose from 'mongoose'
import { connectDatabase } from '../app/mongo/index'
import { Category } from '../app/mongo/schema'

describe('mongoose', () => {
    /**
     *
     */
    it('able to connect to the database', async () => {
        await connectDatabase('test')
        expect(mongoose.connection.readyState).toBeGreaterThan(0)
    })

    /**
     *
     */
    it('can create a category entry in the database', async () => {
        const category = new Category({ name: 'test' + Date.now().toString() })
        await category.save()
        expect(category._id).toBeTruthy()
    })
})
