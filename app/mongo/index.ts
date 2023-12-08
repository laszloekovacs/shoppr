import mongoose from 'mongoose'
import vars from '@/constants/index.server'

export const connectDatabase = async () => {
    if (!vars.MONGO_URI) {
        throw new Error('Please add your Mongo URI to .env')
    }

    await mongoose.connect(vars.MONGO_URI!)
}
