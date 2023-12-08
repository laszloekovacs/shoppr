/**
 * @jest-environment node
 */
import mongoose from 'mongoose'
import { connectDatabase } from '../app/mongo/index'
import { CategoryModel } from '../app/mongo/schema'
import db from '../app/mongo'

describe('mongoose', () => {
    beforeEach(async () => {
        await CategoryModel.deleteMany({})
    })

    afterAll(async () => {
        await CategoryModel.deleteMany({})
    })

    it('able to connect to the database', async () => {
        await connectDatabase('test')
        expect(mongoose.connections.length).toBeGreaterThan(0)
    })

    it('can create a category entry in the database', async () => {
        const category = new CategoryModel({
            name: 'test',
        })
        await category.save()
        expect(category._id).toBeTruthy()
    })
})

describe('db', () => {
    beforeEach(async () => {
        await CategoryModel.deleteMany({})
    })

    afterAll(async () => {
        await CategoryModel.deleteMany({})
    })

    it('can use the db namespace', async () => {
        const result = db.category.create('test' + Date.now().toString())

        expect(result).toBeTruthy()
    })

    it('throws if name is already used', async () => {
        await db.category.create('test')

        expect(db.category.create('test')).rejects.toThrow()
    })
})
