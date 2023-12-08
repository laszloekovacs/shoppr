import '@testing-library/jest-dom'
import CreateCategoryPage, {
    loader,
    action,
} from '../app/routes/dashboard.category.create'
import { json } from '@remix-run/node'

import { createRemixStub } from '@remix-run/testing'
import { render, screen, waitFor } from '@testing-library/react'

describe('CreateCategoryPage', () => {
    const RemixStub = createRemixStub([
        {
            path: '/',
            Component: CreateCategoryPage,
            loader: loader,
        },
    ])

    it('renders create category', async () => {
        const { container } = render(<RemixStub />)

        await waitFor(() => {
            expect(container).toHaveTextContent('Create Category')
        })
    })

    it.skip('posts to action when submit is pressed', async () => {
        const { container } = render(<RemixStub />)

        await waitFor(() => {})
    })
})
