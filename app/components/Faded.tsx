/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'

const Faded = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			css={css`
				opacity: 0.5;
			`}
		>
			{children}
		</div>
	)
}

export default Faded
