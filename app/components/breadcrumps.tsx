import { UIMatch } from '@remix-run/react'
import { Flex, Typography } from './primitives'

interface Props {
	matches: UIMatch<unknown, any>[]
}

const Breadcrumps = ({ matches }: Props) => {
	return (
		<Flex as="ul" dir="row">
			{matches
				.filter((match) => match.handle && match.handle.breadcrumb)
				.map((match, index) => (
					<li key={index}>
						<Typography as="span">{'>'}</Typography>
						<Typography as="span">{match.handle.breadcrumb(match)}</Typography>
					</li>
				))}
		</Flex>
	)
}

export default Breadcrumps
