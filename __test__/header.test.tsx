import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Header from '../app/components/header'

describe('header', () => {
  it('renders', () => {
    render(<Header />)

    const element = document.querySelector('header')

    expect(element).toBeInTheDocument()
  })

  it('renders with the session component', () => {
    render(<Header />)

    const element = document.getElementById('session')

    expect(element).toBeInTheDocument()
  })
})
