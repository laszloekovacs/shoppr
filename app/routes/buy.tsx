import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

const Buy = () => {
  const [{ isPending }] = usePayPalScriptReducer()

  return <>{!isPending && <PayPalButtons />}</>
}

export default Buy
