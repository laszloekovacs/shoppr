import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Header from '../app/components/header'

describe('Header', () => {
  let container: HTMLElement

  it('renders into the document', async () => {
    render(<Header />)
    const header = document.querySelector('header')

    expect(header).toBeInTheDocument()
  })
})
