/**
 * @jest-environment node
 */
import { getOpenIDConfig } from '../app/services/openid.server'

describe('openid', () => {
  it('gets the configuration', async () => {
    const config = await getOpenIDConfig()
    expect(config).toMatchFileSnapshot(
      '../snapshots/getOpenIDConfig.snapshot.json'
    )
  })
})
