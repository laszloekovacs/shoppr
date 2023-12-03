import { getOIDCConfig } from '../app/services/auth0.server'

describe('get OICD config', () => {
  it.skip('returns an object', async () => {
    const result = await getOIDCConfig()

    expect(result).toBeInstanceOf(Object)

    expect(result).toHaveProperty('authorization_endpoint')
    expect(result).toHaveProperty('token_endpoint')
    expect(result).toHaveProperty('jwks_uri')
    expect(result).toHaveProperty('userinfo_endpoint')
  })

  it('for convinience, dumps the object to a snapshot', async () => {
    const result = await getOIDCConfig()

    expect(result).toMatchSnapshot()
  })
})
