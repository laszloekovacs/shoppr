import mongoose from 'mongoose'
import { CategoryModel } from '../mongo/schema'
import type { CategoryDocument } from '../mongo/schema'

export const category = {
    create: async (name: string) => {
        const category: CategoryDocument = new CategoryModel({ name })
        await category.save()

        return category
    },
    getAll: async (): Promise<CategoryDocument[]> => {
        return await CategoryModel.find({})
    },
}
