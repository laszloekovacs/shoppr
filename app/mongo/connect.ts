import mongoose from 'mongoose'
import { MONGODB_URI } from '@/constants'

console.log(`💽 connecting to database: ${MONGODB_URI}`)

export const connectDatabase = () => {
    mongoose.connect(MONGODB_URI).then(() => {
        console.log(`💽 connected to database: ${mongoose.connection.host}`)
    })
}

connectDatabase()
