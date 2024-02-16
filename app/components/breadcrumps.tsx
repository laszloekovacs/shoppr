import { UIMatch } from '@remix-run/react'

interface Props {
	matches: UIMatch<unknown, any>[]
}

const Breadcrumps = ({ matches }: Props) => {
	return (
		<div>
			<ol>
				{matches
					.filter((match) => match.handle && match.handle.breadcrumb)
					.map((match, index) => (
						<li key={index}>{match.handle.breadcrumb(match)}</li>
					))}
			</ol>
		</div>
	)
}

export default Breadcrumps
