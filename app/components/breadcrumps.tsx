import { UIMatch } from '@remix-run/react'
import { Flex } from './primitives/flexbox'

interface Props {
	matches: UIMatch<unknown, any>[]
}

const Breadcrumps = ({ matches }: Props) => {
	return (
		<div>
			<Flex as="ul" dir="row">
				{matches
					.filter((match) => match.handle && match.handle.breadcrumb)
					.map((match, index) => (
						<li key={index}>{match.handle.breadcrumb(match)}</li>
					))}
			</Flex>
		</div>
	)
}

export default Breadcrumps
