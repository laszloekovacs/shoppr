import type { ActionFunction, LoaderFunction } from '@remix-run/node'

export const action: ActionFunction = async ({ request }) => {
  console.log('request', request)

  return null
}

export const loader: LoaderFunction = async (args) => {
  // get the hash
  console.log('args', args)

  return JSON.stringify({ ok: 'cool' })
}
