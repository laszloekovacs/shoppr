import mongoose from 'mongoose'
import { CategoryModel } from '../mongo/schema'
import type { CategoryDocument } from '../mongo/schema'

export const createCategory = (name: string) => {
    const category: CategoryDocument = new CategoryModel({ name })
    category.save()

    return category
}
