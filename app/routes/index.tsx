import type { MetaFunction } from '@remix-run/node'
import Header from '../components/header'
import { Outlet } from '@remix-run/react'

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
      <Outlet />
    </section>
  )
}
