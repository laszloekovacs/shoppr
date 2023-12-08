import 'dotenv/config'

assert(process.env.AZURE_KEYVAULT_URI, 'Please provide AZURE_KEYVAULT_URI')
export const AZURE_KEYVAULT_URI = process.env.AZURE_KEYVAULT_URI!
export const DB = process.env.DB!
