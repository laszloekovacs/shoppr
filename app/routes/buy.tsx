import chalk from 'chalk'
import createLogger from '~/features/logger'

const logger = createLogger('loader', chalk.bgMagenta, chalk.black)

const Buy = () => {
  const createOrder = async (data: any, actions: any) => ''

  const onApprove = async (data: any, actions: any) => {}

  //<PayPalButtons createOrder={createOrder} onApprove={onApprove} />
  return (
    <div>
      <h1>Buy Stuff</h1>
      <div></div>
    </div>
  )
}

export default Buy
