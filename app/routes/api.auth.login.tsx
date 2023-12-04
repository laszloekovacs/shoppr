import { LoaderFunction, json, redirect } from '@remix-run/node'
import { getOpenIDConfig } from '~/services/openid.server'
import { config } from '~/services/config.server'

/* start the login process by redirecting to the endpoint */
export const loader: LoaderFunction = async () => {
  try {
    // get the openid login endpoint
    const openidConfig = await getOpenIDConfig()
    const endpoint = new URL(openidConfig.authorization_endpoint)

    const nonce = crypto.getRandomValues(new Uint32Array(1))[0].toString()

    // set the reqired params for the login
    const sp = new URLSearchParams()
    sp.append('nonce', nonce)
    sp.append('state', 'unused for now')
    sp.append('scope', 'openid profile')
    sp.append('response_type', 'id_token')
    sp.append('client_id', config.AUTH0_CLIENT_ID!)
    sp.append('response_mode', 'form_post')
    sp.append('redirect_uri', config.AUTH0_REDIRECT_URI!)
    endpoint.search = sp.toString()

    // redirect user to 3rd party login provider
    return redirect(endpoint.toString())
  } catch (error) {
    return json({
      error: JSON.stringify(error),
    })
  }
}
