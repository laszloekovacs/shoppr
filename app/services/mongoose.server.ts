import mongoose from 'mongoose'
import { MONGODB_URI, MONGODB_DBNAME } from '@/services/constraints.server'
import chalk from 'chalk'
const mp = `${chalk.bgGreenBright(' mongoose ')} `

export const connectDatabase = async () => {
    /* extract and show url */
    const url = new URL(MONGODB_URI)
    console.log(mp + 'host: ' + url.host)

    /* check if we are already have a connection */
    if (mongoose.connections[0].readyState) {
        console.log(mp + '💽 already connected to db')
        return
    }

    /* connect */
    mongoose.connect(MONGODB_URI, { dbName: MONGODB_DBNAME }).then(() => {
        console.log(mp + `💽 connected to database`)
    })
}
