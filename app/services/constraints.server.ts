import 'dotenv/config'
import assert from 'assert'

assert(process.env.AZURE_KEYVAULT_URI, '🔐 Please provide AZURE_KEYVAULT_URI')
export const AZURE_KEYVAULT_URI = process.env.AZURE_KEYVAULT_URI!

export const MONGODB_URI = process.env.MONGODB_URI!
export const MONGODB_DBNAME = process.env.MONGODB_DBNAME!

console.log('loaded constraints')