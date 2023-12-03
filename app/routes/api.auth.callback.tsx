import type { ActionFunction, LoaderFunction } from '@remix-run/node'

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()

  const token = form.get('token')
  const state = form.get('state')

  console.log({ token, state })

  return JSON.stringify({ ok: 'cool' })
}

export const loader: LoaderFunction = async (args) => {
  // get the hash
  console.log('args', args)

  return JSON.stringify({ ok: 'cool' })
}
