import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Session from '../app/components/session'

describe('session button', () => {
  it('renders into the document', async () => {
    render(<Session />)

    expect(document.querySelector('section')).toBeInTheDocument()
  })
})
