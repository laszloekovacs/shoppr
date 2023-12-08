import '@testing-library/jest-dom'
import CreateCategoryPage, {
    loader,
    action,
} from '../app/routes/dashboard.category.create'
import { ActionFunctionArgs, json } from '@remix-run/node'

import { createRemixStub } from '@remix-run/testing'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

describe('CreateCategoryPage', () => {
    const RemixStub = createRemixStub([
        {
            path: '/',
            Component: CreateCategoryPage,
            loader,
            action,
        },
    ])

    it('renders create category', async () => {
        const { container } = render(<RemixStub />)

        await waitFor(() => {
            expect(container).toHaveTextContent('Create Category')
        })
    })

    it('have a form with an input with name', async () => {
        const { container } = render(<RemixStub />)

        await waitFor(() => {
            expect(
                container.querySelector('input[name="name"]'),
            ).toBeInTheDocument()
        })
    })

    it('pressing submit calls the action', async () => {
        /* create a fake action to mock */
        const fakeAction = vi.fn(async (params: ActionFunctionArgs) => {
            return json({ name: 'test' })
        })

        /* custom stub to render */
        const RemixStub = createRemixStub([
            {
                path: '/',
                Component: CreateCategoryPage,
                loader,
                action: fakeAction,
            },
        ])

        render(<RemixStub />)

        await waitFor(() => {
            /* get the button after rendering */
            const submitButton = screen.getByRole('submit')

            /* send a click */
            fireEvent.click(submitButton)

            /* expect the action to be called */
            expect(fakeAction).toHaveBeenCalled()
        })
    })
})
