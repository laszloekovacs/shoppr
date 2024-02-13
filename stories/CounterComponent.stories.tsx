import type { Meta, StoryObj } from '@storybook/react'

import CounterComponent from '../app/hooks/CounterComponent'

const meta = {
	title: 'CounterComponent',
	component: CounterComponent,
} satisfies Meta<typeof CounterComponent>
export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
	render: () => <CounterComponent />,
}
