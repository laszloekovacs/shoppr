import { Link } from '@remix-run/react'
import { Flex } from './primitives/flexbox'
import { Text } from './primitives/text'

interface Props {
	name: string
	url?: string
}

const Card = (props: Props) => {
	return (
		<Flex dir="column" gap="0.4rem" pad="0.2rem">
			<img src="https://picsum.photos/200" alt={props.name} height={200} />

			<Flex dir="column">
				<Text bold fontSize="lg">
					{props.name}
				</Text>
				<Text fontSize="base">400Ft</Text>
			</Flex>
		</Flex>
	)
}
export default Card
