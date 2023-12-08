/**
 * @jest-environment node
 */
import mongoose from 'mongoose'
import { connectDatabase } from '../app/mongo/index'

describe('mongoose', () => {
    /**
     *
     */
    it('able to connect to the database', async () => {
        await connectDatabase()
        expect(mongoose.connection.readyState).toBe(1)
    })

    /**
     *
     */
})
