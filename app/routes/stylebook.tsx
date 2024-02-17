import { Flex } from '~/components/primitives/flexbox'
import { Text } from '../components/primitives/text'
import Card from '~/components/card'

const StyleBook = () => {
	return (
		<div>
			<div style={{ maxWidth: '200px' }}>
				<Card name={'something'} />
			</div>

			<Text>row</Text>
			<Flex dir="row">
				<Text as="h3">Hello</Text>
				<Text as="h3">Hello</Text>
				<Text as="h3">Hello</Text>
			</Flex>
			<Text>column</Text>
			<Flex dir="column">
				<Text as="h3">Hello</Text>
				<Text as="h3">Hello</Text>
				<Text as="h3">Hello</Text>
			</Flex>

			<Text>Font sizes</Text>
			<Flex dir="column">
				<Text fontSize="xs">extra small</Text>
				<Text fontSize="sm">small</Text>
				<Text fontSize="base">base</Text>
				<Text fontSize="lg">large</Text>
				<Text fontSize="2xl">2xl size</Text>
				<Text fontSize="4xl">4xl size</Text>
				<Text fontSize="6xl">6xl size</Text>
			</Flex>

			<Text>Font sizes with bold</Text>
			<Flex dir="column">
				<Text bold fontSize="xs">
					extra small
				</Text>
				<Text bold fontSize="sm">
					small
				</Text>
				<Text bold fontSize="base">
					base
				</Text>
				<Text bold fontSize="lg">
					large
				</Text>
				<Text bold fontSize="2xl">
					2xl size
				</Text>
				<Text bold fontSize="4xl">
					4xl size
				</Text>
				<Text bold fontSize="6xl">
					6xl size
				</Text>
			</Flex>
		</div>
	)
}

export default StyleBook
