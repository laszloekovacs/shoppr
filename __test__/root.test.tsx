import { loader as rootLoader } from '../app/root'
import 'dotenv/config'

const args = {
  request: new Request('http://localhost'),
  params: {},
  context: {},
}

describe('root loader', () => {
  it('returns with an http response', async () => {
    const response = await rootLoader(args)

    expect(response).toBeInstanceOf(Response)
  })

  it('returns a json response', async () => {
    const response = await rootLoader(args)
    if (response instanceof Response) {
      const data = await response.json()
      expect(data).toBeTruthy()
    }
  })

  it('has a paypal clientId', async () => {
    const response = await rootLoader(args)

    if (response instanceof Response) {
      const data = await response.json()

      console.log(data)

      expect(data.clientId).toBeTypeOf('string')
    }
  })
})
