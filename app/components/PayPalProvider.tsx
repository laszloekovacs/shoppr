import React from 'react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { paypal_client_id } from '~/features/paypal.server'

const PayPalProvider = ({ children }: { children: React.ReactNode }) => {
  const options = {
    clientId: paypal_client_id,
    currency: 'HUF',
    intent: 'capture',
  }

  return (
    <PayPalScriptProvider deferLoading={true} options={options}>
      {children}
    </PayPalScriptProvider>
  )
}

export default PayPalProvider
