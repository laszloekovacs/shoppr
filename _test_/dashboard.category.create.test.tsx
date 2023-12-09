import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { createRemixStub } from '@remix-run/testing'
import CreateCategoryPage, {
	loader,
	action,
} from '@/routes/dashboard.category.create'
import App from '@/root'

describe('dashboard.category.create', () => {
	const Stub = createRemixStub([
		{
			path: '/',
			Component: CreateCategoryPage,
			loader,
			action,
		},
	])

	it('renders without crashing', async () => {
		render(<Stub />)
	})

	it('has a form with a submit input', async () => {
		render(<Stub />)
		await waitFor(() => {
			screen.findByRole('submit')
		})
	})
})
