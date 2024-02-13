import type { Meta, StoryObj } from '@storybook/react'
import Reveal from '../app/components/Reveal'

const meta = {
	title: 'Reveal',
	component: Reveal,
} satisfies Meta<typeof Reveal>
export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		children: <p>the lorem ipsum</p>,
	},
}
