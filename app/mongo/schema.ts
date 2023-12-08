import mongoose, { Schema } from 'mongoose'

const categorySchema = new Schema(
    {
        name: { type: Schema.Types.String, required: true, unique: true },
    },
    { timestamps: true },
)

export const Category =
    mongoose.models.Category || mongoose.model('Category', categorySchema)

/**
 *
 */
const productSchema = new Schema(
    {
        name: { type: Schema.Types.String, required: true, unique: true },
        description: { type: Schema.Types.String },
    },
    {
        timestamps: true,
    },
)

export const Product =
    mongoose.models.Product || mongoose.model('Product', productSchema)
