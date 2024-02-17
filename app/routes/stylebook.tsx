import { Flex } from '~/components/primitives/flexbox'
import { Text } from '../components/primitives/text'

const StyleBook = () => {
	return (
		<div>
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
				<Text fontSize="base">base</Text>
				<Text fontSize="lg">lg</Text>
				<Text fontSize="2xl">2xl</Text>
				<Text fontSize="4xl">4xl</Text>
			</Flex>
		</div>
	)
}

export default StyleBook
