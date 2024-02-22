import { UIMatch } from '@remix-run/react'

interface Props {
	matches: UIMatch<unknown, any>[]
}

const Breadcrumps = ({ matches }: Props) => {
	return (
		<div>
			{matches
				.filter(match => match.handle && match.handle.breadcrumb)
				.map((match, index) => (
					<li key={index}>
						<span>{'>'}</span>
						<span>{match.handle.breadcrumb(match)}</span>
					</li>
				))}
		</div>
	)
}

export default Breadcrumps
