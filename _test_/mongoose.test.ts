/**
 * @jest-environment node
 */
import mongoose from 'mongoose'
import { connectDatabase } from '../app/services/mongoose.server'

describe('mongoose', () => {
    it('able to connect to database', async () => {
        await connectDatabase()
        expect(mongoose.connection.readyState).toBeGreaterThan(1)
    })
})
