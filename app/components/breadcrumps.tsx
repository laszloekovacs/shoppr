import { UIMatch } from '@remix-run/react'
import RawData from './raw-data'

interface Props {
	matches: UIMatch<unknown, any>[]
}

const Breadcrumps = ({ matches }: Props) => {
	return (
		<div>
			<ol
				style={{
					display: 'flex',
					flexDirection: 'row',
					listStyle: 'none',
					padding: '1ch',
					border: '1px solid rgba(0,0,0,0.2)',
				}}
			>
				{matches
					.filter((match) => match.handle && match.handle.breadcrumb)
					.map((match, index) => (
						<li key={index}>{match.handle.breadcrumb(match)}</li>
					))}
			</ol>

			<RawData data={matches} />
		</div>
	)
}

export default Breadcrumps
