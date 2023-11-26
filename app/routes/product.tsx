import { ActionFunction, json } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import chalk from 'chalk'
import createLogger from '~/features/logger'
import { Product } from '~/mongo/index'

export const action: ActionFunction = async ({ request }) => {
  // get the inputs
  const formData = await request.formData()
  const inputs = Object.fromEntries(formData)

  // create a new product
  const product = new Product({
    name: inputs.product,
    description: inputs.description,
  })

  product.save()

  return null
}

const ProductPage = () => {
  return (
    <div>
      <Form method="post">
        <input type="text" name="product" placeholder="product name" required />
        <input type="text" name="description" placeholder="description" />
        <input type="submit" value="Submit" />
      </Form>
    </div>
  )
}

export default ProductPage
