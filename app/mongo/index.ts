import mongoose, { Schema } from 'mongoose'
import 'dotenv/config'
import kleur from 'kleur'

const productSchema = new Schema(
  {
    name: { type: Schema.Types.String, required: true, unique: true },
    description: { type: Schema.Types.String },
  },
  {
    timestamps: true,
  }
)

export const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema)

export const connectMongo = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.log(kleur.bgRed('mongoose') + ' MONGO_URI not found')
      process.exit(1)
    }

    await mongoose.connect(process.env.MONGO_URI!)
    console.log(kleur.black().bgGreen(' mongoose ') + ' MongoDB connected')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

//connectMongo()
