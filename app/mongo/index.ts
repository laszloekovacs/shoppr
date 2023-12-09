import mongoose from 'mongoose'
import { MONGODB_URI } from '@/constants'

console.log(`💽 connecting to database: ${MONGODB_URI}`)

export const connectDatabase = async (db?: string) => {
    await mongoose.connect(MONGODB_URI, { dbName: db })
}

connectDatabase().then(() => {
    console.log(`💽 connected to database: ${mongoose.connection.host}`)
})
