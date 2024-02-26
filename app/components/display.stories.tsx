import type { Meta, StoryObj } from '@storybook/react'

import { Display } from './display'

const meta = {
	title: 'Display',
	component: Display
} satisfies Meta<typeof Display>

export default meta
type Story = StoryObj<typeof meta>

export const Display1: Story = {
	args: {
		children: 'Display 1'
	}
}
