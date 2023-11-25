import chalk from 'chalk'
import createLogger from '~/features/logger'
import { getAccessToken } from '~/features/paypal'

const logger = createLogger('token', chalk.bgMagenta, chalk.black)

export const loader = async () => {
  try {
    const token = await getAccessToken()
    logger(token)
    return null
  } catch (error) {}
}

const Buy = () => {
  return <div>Buy</div>
}

export default Buy
