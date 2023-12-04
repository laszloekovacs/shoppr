import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import Header from '~/components/header'
import Login from '~/components/login'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  return (
    <section id="index">
      <Header />
      <Login />
    </section>
  )
}
