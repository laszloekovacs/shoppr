import mongoose, { Document, Schema } from 'mongoose'
console.log('mongo schema loaded')

/**
 * categories
 */
export interface CategoryDocument extends Document {
    name: string
}

const categorySchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
    },
    { timestamps: true },
)

export const CategoryModel =
    mongoose.models.Category ||
    mongoose.model<CategoryDocument>('Category', categorySchema)

/**
 * products
 */
export interface ProductDocument extends Document {
    name: string
    description: string
}

const productSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String },
    },
    {
        timestamps: true,
    },
)

export const Product =
    mongoose.models.Product ||
    mongoose.model<ProductDocument>('Product', productSchema)
