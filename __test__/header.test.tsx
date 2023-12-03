/**
 * @jest-environment jsdom
 */
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '../app/components/header'

describe('Header', () => {
  let container: HTMLElement

  it('renders', async () => {
    render(<Header />)

    const header = await screen.findByText('Header')

    expect(header).not.toBeNull()
  })
})
