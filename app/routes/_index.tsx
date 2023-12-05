import type { MetaFunction } from '@remix-run/node'
import Header from '../components/header'
import React from 'react'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  return (
    <section id="index">
      <h2 className="text-3xl">hello</h2>
      <Header />
    </section>
  )
}
