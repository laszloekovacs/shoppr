import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import Header from '~/components/header'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  return (
    <div>
      <Header />
    </div>
  )
}
