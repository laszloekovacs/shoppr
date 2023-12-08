/**
 * @jest-environment node
 */
import mongoose from 'mongoose'
import { connectDatabase } from '../app/mongo/index'

describe('mongoose', () => {
    /**
     *
     */
    it('does not throw an error', async () => {
        expect(await connectDatabase()).not.toThrowError()
        expect(mongoose.connection.readyState).toBe(1)
    })

    /**
     *
     */
})
