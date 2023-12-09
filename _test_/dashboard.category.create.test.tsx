import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { createRemixStub } from '@remix-run/testing'
import CreateCategoryPage, {
    loader,
    action,
} from '@/routes/dashboard.category.create'

describe('dashboard.category.create', () => {
    it('renders without crashing', () => {
        const Stub = createRemixStub([
            {
                path: '/',
                Component: CreateCategoryPage,
                loader,
                action,
            },
        ])

        render(<Stub />)
    })
})
