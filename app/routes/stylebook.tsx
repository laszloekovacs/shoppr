import { Flex } from '~/components/primitives/flex'
import { Typography } from '../components/primitives/typography'
import Card from '~/components/card'

const StyleBook = () => {
	return (
		<div>
			<div style={{ maxWidth: '200px' }}>
				<Card name={'something'} />
			</div>

			<Typography>row</Typography>
			<Flex dir="row">
				<Typography as="h3">Hello</Typography>
				<Typography as="h3">Hello</Typography>
				<Typography as="h3">Hello</Typography>
			</Flex>
			<Typography>column</Typography>
			<Flex dir="column">
				<Typography as="h3">Hello</Typography>
				<Typography as="h3">Hello</Typography>
				<Typography as="h3">Hello</Typography>
			</Flex>

			<Typography>Font sizes</Typography>
			<Flex dir="column">
				<Typography fontSize="xs">extra small</Typography>
				<Typography fontSize="sm">small</Typography>
				<Typography fontSize="base">base</Typography>
				<Typography fontSize="lg">large</Typography>
				<Typography fontSize="2xl">2xl size</Typography>
				<Typography fontSize="4xl">4xl size</Typography>
				<Typography fontSize="6xl">6xl size</Typography>
			</Flex>

			<Typography>Font sizes with bold</Typography>
			<Flex dir="column">
				<Typography bold fontSize="xs">
					extra small
				</Typography>
				<Typography bold fontSize="sm">
					small
				</Typography>
				<Typography bold fontSize="base">
					base
				</Typography>
				<Typography bold fontSize="lg">
					large
				</Typography>
				<Typography bold fontSize="2xl">
					2xl size
				</Typography>
				<Typography bold fontSize="4xl">
					4xl size
				</Typography>
				<Typography bold fontSize="6xl">
					6xl size
				</Typography>
			</Flex>
		</div>
	)
}

export default StyleBook
