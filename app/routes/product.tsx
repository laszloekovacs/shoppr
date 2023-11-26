import { ActionFunction, LoaderFunction, json } from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
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

export const loader: LoaderFunction = async ({ request }) => {
  // query all products
  const products = await Product.find()

  return products
}

const ProductPage = () => {
  const products = useLoaderData<typeof loader>()

  return (
    <div>
      <Form method="post">
        <input type="text" name="product" placeholder="product name" required />
        <input type="text" name="description" placeholder="description" />
        <input type="submit" value="Submit" />
      </Form>
      <hr />
      <div>
        {products.map((product) => (
          <div key={product._id}>
            <p>{product.name}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductPage
