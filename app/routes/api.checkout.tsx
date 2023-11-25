import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export const loader = async (params: LoaderFunctionArgs) => {
  switch (params.request.method) {
    case 'POST':
  }

  return json({
    ok: true,
  })
}

export const action = async (params: ActionFunctionArgs) => {
  if (params.request.method !== 'POST') {
    return json({
      ok: false,
    })
  } else {
    return json({
      ok: true,
    })
  }
}
