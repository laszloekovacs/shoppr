import { Flex } from './primitives/flex'
import { Typography } from './primitives'

interface Props {
	name: string
	url?: string
}

const Card = (props: Props) => {
	return (
		<Flex dir="column" gap="0.4rem" pad="0.2rem">
			<img src="https://picsum.photos/200" alt={props.name} height={200} />

			<Flex dir="column">
				<Typography bold fontSize="lg">
					{props.name}
				</Typography>
				<Typography fontSize="base">400Ft</Typography>
			</Flex>
		</Flex>
	)
}
export default Card
