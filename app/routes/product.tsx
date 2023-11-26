import { ActionFunction, json } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import chalk from 'chalk'
import createLogger from '~/features/logger'

const logOk = createLogger('product', chalk.bgYellow, chalk.black)

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const inputs = Object.fromEntries(formData)
  logOk(inputs)
  return json({ ok: true })
}

const Product = () => {
  const data = useActionData<typeof action>()

  return (
    <Form method="post">
      <input type="text" name="product" placeholder="product name" />
      <input type="submit" value="Submit" />
      <div>
        <p>{data ? 'okay' : 'not yet'}</p>
      </div>
    </Form>
  )
}

export default Product
