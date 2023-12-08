import mongoose from 'mongoose'
import { getKeyFromKeyVault } from 'app/services/azure.server'

export const connectDatabase = async (db?: string) => {
    const key = await getKeyFromKeyVault('mongoConnectionString')

    if (!key || !key.value) {
        throw new Error('Please add your mongoConnectionString to keyvault')
    } else {
        return await mongoose.connect(key.value, { dbName: db })
    }
}

/* don't catch, let it fail */
connectDatabase().then(() => {
    console.log(`💽 connected to database: ${mongoose.connection.host}`)
})

/* reexport resolvers */
import { category } from './resolvers'

const db = {
    category,
}

export default db
