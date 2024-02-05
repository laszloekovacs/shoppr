import type { Meta, StoryObj } from '@storybook/react'

import Card from '../app/components/Card'

const meta = {
	title: 'Example/Card',
	component: Card,
} satisfies Meta<typeof Card>
export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		product: 'Shoes',
		price: '$100',
	},
}
