import mongoose from 'mongoose'
import { MONGODB_URI } from '@/constants/index.server'

console.log(`💽 connecting to database: ${MONGODB_URI}`)

export const connectDatabase = async (db?: string) => {
    await mongoose.connect(MONGODB_URI, { dbName: db })
}

/* don't catch, let it fail */
connectDatabase().then(() => {
    console.log(`💽 connected to database: ${mongoose.connection.host}`)
})
