import { createCookieSessionStorage } from '@remix-run/node'

type SessionData = {
  token?: string
}

const session = createCookieSessionStorage<SessionData>({
  cookie: {
    name: 'shoppr_session',
    httpOnly: true,
    sameSite: 'lax',
    secrets: ['s3cr3t'],
    secure: process.env.NODE_ENV === 'production',
  },
})

export const { commitSession, getSession, destroySession } = session
