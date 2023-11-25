import { useLoaderData } from '@remix-run/react'
import chalk from 'chalk'
import createLogger from '~/features/logger'
import { loadScript } from '@paypal/paypal-js'
import { useEffect, useRef } from 'react'
import { LoaderFunctionArgs, json } from '@remix-run/node'

const logger = createLogger('loader', chalk.bgMagenta, chalk.black)

export const loader = async (params: LoaderFunctionArgs) => {
  logger('Loading token...')

  return json({
    client_id:
      'ASi0nLR3W3Z5QQ-37Prv41WJ_EywNp5ttaLY2RUdVuhc_d7D17tIBZuWk3OmBhFbG31NEz2McKhVQTB9',
  })
}

const Buy = () => {
  const { client_id } = useLoaderData<typeof loader>()
  const paypalRef = useRef(null)

  useEffect(() => {
    loadScript({ clientId: client_id, currency: 'HUF' })
      .then((paypal) => {
        paypal
          ?.Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: 'HUF',
                      value: '500.00',
                    },
                  },
                ],
              })
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture()
              logger(order)
            },
          })
          ?.render(paypalRef.current)
      })
      .catch((err) => {
        logger(err)
      })

    return () => {
      if (paypalRef.current) {
        paypalRef.current.innerHTML = ''
      }
    }
  }, [])

  return (
    <div>
      <div ref={paypalRef}></div>
    </div>
  )
}

export default Buy
