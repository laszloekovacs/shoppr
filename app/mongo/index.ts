import mongoose from 'mongoose'
import { SecretClient } from '@azure/keyvault-secrets'
import { DefaultAzureCredential } from '@azure/identity'
import { AZURE_KEYVAULT_URI } from '../constants/index.server'

export const connectDatabase = async () => {
    const credentials = new DefaultAzureCredential()
    const client = new SecretClient(AZURE_KEYVAULT_URI, credentials)

    const { value } = await client.getSecret('mongoConnectionString')

    if (!value) {
        throw new Error('Please add your mongoConnectionString to keyvault')
    }

    return await mongoose.connect(value)
}

/*  */
connectDatabase().then(() => {
    console.log(`connected to database: ${mongoose.connection.host}`)
})
