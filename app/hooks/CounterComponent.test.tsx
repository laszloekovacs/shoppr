// @jest-environment jsdom

import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import CounterComponent from './CounterComponent'
import { describe, test, expect, it } from 'vitest'

describe('CounterComponent', () => {
	it('renders initial count correctly', () => {
		const { getByText } = render(<CounterComponent />)

		expect(getByText(/Count:/i).textContent).toBe('Count: 0')
	})
})
