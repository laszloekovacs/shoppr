import { Flex } from '~/components/Flex'
import { Text } from '../components/text'

const StyleBook = () => {
	return (
		<div>
			<Text>row</Text>
			<Flex direction="row">
				<Text as="h3">Hello</Text>
				<Text as="h3">Hello</Text>
				<Text as="h3">Hello</Text>
			</Flex>
			<Text>column</Text>
			<Flex direction="column">
				<Text as="h3">Hello</Text>
				<Text as="h3">Hello</Text>
				<Text as="h3">Hello</Text>
			</Flex>

			<Text>Font sizes</Text>
			<Flex direction="column">
				<Text fontSize="base">base</Text>
				<Text fontSize="lg">lg</Text>
				<Text fontSize="2xl">2xl</Text>
				<Text fontSize="4xl">4xl</Text>
			</Flex>
		</div>
	)
}

export default StyleBook
