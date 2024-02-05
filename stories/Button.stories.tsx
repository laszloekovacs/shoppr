import type { Meta, StoryObj } from '@storybook/react'

import Button from '../app/components/Button'

const meta = {
	title: 'Example/Button',
	component: Button,
} satisfies Meta<typeof Button>
export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
	render: () => <Button>stylish button</Button>,
}
