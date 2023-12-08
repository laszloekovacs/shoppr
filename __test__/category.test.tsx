import '@testing-library/jest-dom'
import CreateCategoryPage from '../app/routes/dashboard.category.create'
import { json } from '@remix-run/node'

import { createRemixStub } from '@remix-run/testing'
import { render, screen, waitFor } from '@testing-library/react'

describe('CreateCategoryPage', () => {
    const RemixStub = createRemixStub([
        {
            path: '/',
            Component: CreateCategoryPage,
            loader() {
                return json({ message: 'hello' })
            },
        },
    ])

    it('renders create category', async () => {
        const { container } = render(<RemixStub />)

        await waitFor(() => {
            expect(container).toHaveTextContent('Create Category')
        })
    })
})
