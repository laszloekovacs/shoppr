import { UIMatch } from '@remix-run/react'
import { Flex } from './flex'

interface Props {
	matches: UIMatch<unknown, any>[]
}

const Breadcrumps = ({ matches }: Props) => {
	return (
		<Flex>
			{matches
				.filter(match => match.handle && match.handle.breadcrumb)
				.map((match, index) => (
					<li key={index}>
						<span>{'>'}</span>
						<span>{match.handle.breadcrumb(match)}</span>
					</li>
				))}
		</Flex>
	)
}

export default Breadcrumps
