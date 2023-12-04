/**
 * @jest-environment node
 */
import { isWebKeySetSchema } from '~/services/webkeyset.server'
import {
  getOpenIDConfig,
  getOpenIDPublicKeys,
} from '../app/services/openid.server'

describe('openid', () => {
  it('gets the configuration', async () => {
    const config = await getOpenIDConfig()
    expect(config).toMatchFileSnapshot(
      '../snapshots/getOpenIDConfig.snapshot.json'
    )
  })
})

describe('getOpenIDPublicKey', () => {
  it('gets the public key', async () => {
    const publickey = await getOpenIDPublicKeys()

    const valid = isWebKeySetSchema(publickey)

    expect(valid).toBe(true)
  })
})
