import 'dotenv/config'
import assert from 'assert'
import chalk from 'chalk'
const mp = `${chalk.bgMagenta(' env ')} `

assert(process.env.AZURE_KEYVAULT_URI, 'Please provide AZURE_KEYVAULT_URI')
assert(process.env.AZURE_CLIENT_ID, 'Please provide AZURE_CLIENT_ID')
assert(process.env.AZURE_CLIENT_SECRET, 'Please provide AZURE_CLIENT_SECRET')
assert(process.env.AZURE_TENANT_ID, 'Please provide AZURE_TENANT_ID')

assert(process.env.MONGODB_URI, 'Please provide MONGODB_URI')
assert(process.env.MONGODB_DBNAME, 'Please provide MONGODB_DBNAME')

export const AZURE_KEYVAULT_URI = process.env.AZURE_KEYVAULT_URI!
export const AZURE_CLIENT_ID = process.env.AZURE_CLIENT_ID!
export const AZURE_CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET!
export const AZURE_TENANT_ID = process.env.AZURE_TENANT_ID!

export const MONGODB_URI = process.env.MONGODB_URI!
export const MONGODB_DBNAME = process.env.MONGODB_DBNAME!

console.log(mp + 'loaded constraints')
