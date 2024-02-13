import type { Meta, StoryObj } from '@storybook/react'
import Faded from '../app/components/Faded'

const meta = {
	title: 'Faded',
	component: Faded,
} satisfies Meta<typeof Faded>
export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		children: <p>the lorem ipsum</p>,
	},
}
