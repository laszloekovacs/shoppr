import { LoaderFunction, json, redirect } from '@remix-run/node'
import { getOIDCConfig } from '~/services/auth0.server'

type oidc = {
  authorization_endpoint: string
  token_endpoint: string
  jwks_uri: string
  userinfo_endpoint: string
}

export const config: oidc = await getOIDCConfig()

/* start the login process by redirecting to the endpoint */
export const loader: LoaderFunction = async () => {
  try {
    const endpoint = new URL(config.authorization_endpoint)

    const nonce = crypto.getRandomValues(new Uint32Array(1))[0].toString()

    endpoint.searchParams.append('nonce', nonce)
    endpoint.searchParams.append('state', '12345')
    endpoint.searchParams.append('scope', 'openid profile')
    endpoint.searchParams.append('response_type', 'id_token')
    endpoint.searchParams.append('client_id', process.env.AUTH0_CLIENT_ID!)
    endpoint.searchParams.append('response_mode', 'form_post')
    endpoint.searchParams.append(
      'redirect_uri',
      process.env.AUTH0_REDIRECT_URI!
    )

    return redirect(endpoint.toString(), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return json({
      error: JSON.stringify(error),
    })
  }
}
