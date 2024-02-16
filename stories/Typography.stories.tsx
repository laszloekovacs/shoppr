import type { Meta, StoryObj } from '@storybook/react'
import { H1, H2, H3 } from '../app/components/typography'
import Flex from '../app/components/flex-box'

const meta = {
	title: 'Typography',
	component: Flex,
} satisfies Meta<typeof Flex>
export default meta

type Story = StoryObj<typeof meta>

export const h1story: Story = {
	args: {
		children: (
			<div>
				<H1>Header 1</H1>
				<H2>Header 2</H2>
				<H3>Header 3</H3>
			</div>
		),
	},
}
