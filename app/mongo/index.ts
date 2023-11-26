import mongoose, { Schema } from 'mongoose'
import 'dotenv/config'

const productSchema = new mongoose.Schema(
  {
    name: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String },
  },
  {
    timestamps: true,
  }
)

export const Product = mongoose.model('Product', productSchema)

// initialize mongoose connection
export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!)
  } catch (error) {
    console.log(error)
  }
}
