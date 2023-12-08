import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node'
import { auth } from '../services/auth.server'

export const loader: LoaderFunction = async () => redirect('/')

export const action: ActionFunction = async ({ request }) =>
    auth.authenticate('auth0', request)
