import { MONGODB_URI } from './constants.server'
import { MongoClient } from 'mongodb'

export const mongoClient = new MongoClient(MONGODB_URI)


