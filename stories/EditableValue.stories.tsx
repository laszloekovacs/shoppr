import type { Meta, StoryObj } from '@storybook/react'

import EditableValue from '../app/components/EditableValue'

const meta = {
	title: 'EditableValue',
	component: EditableValue,
} satisfies Meta<typeof EditableValue>
export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
	args: {
		initialValue: 5,
		name: 'bits',
	},
}
