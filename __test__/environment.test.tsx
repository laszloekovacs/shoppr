/**
 * @jest-environment node
 */

import { getEnv } from '../app/services/environment.server'

describe('environment', () => {
  it('throws if the token is not found', async () => {
    expect(() => {
      getEnv('TEST_VALUE_UNDEFINED')
    }).toThrow()
  })

  it('returns the token if its defined', async () => {
    const AUTH0_DOMAIN = getEnv('AUTH0_DOMAIN')

    expect(AUTH0_DOMAIN).toBeDefined()
  })
})
