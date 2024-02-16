/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { UIMatch } from '@remix-run/react'

interface Props {
	matches: UIMatch<unknown, any>[]
}

const Breadcrumps = ({ matches }: Props) => {
	return (
		<div>
			<ol
				css={css`
					display: flex;
					flex-direction: row;
					gap: 1ch;
					list-style: none;
					padding: 1ch;
					border: 1px solid rgba(0, 0, 0, 0.2);
				`}
			>
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
