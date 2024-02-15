import type { Meta, StoryObj } from '@storybook/react'

import Flex from '../app/components/Flex'

const meta = {
	title: 'Flex',
	component: Flex,
} satisfies Meta<typeof Flex>
export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		children: (
			<>
				<p>the lorem ipsum</p>
				<p>the lorem ipsum</p>
				<p>the lorem ipsum</p>
			</>
		),
	},
}
