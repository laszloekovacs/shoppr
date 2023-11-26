import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

import chalk from 'chalk'
import createLogger from '~/features/logger'

const logOk = createLogger('loader', chalk.bgMagenta, chalk.black)

const Buy = () => {
  const [{ isPending }] = usePayPalScriptReducer()

  return <>{!isPending && <PayPalButtons />}</>
}

export default Buy
