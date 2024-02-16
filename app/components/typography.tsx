/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

interface Props {
	children: React.ReactNode
}

export const H1 = ({ children }: Props) => (
	<h1
		css={css`
			font-size: 1.7rem;
			color: hotpink;
		`}
	>
		{children}
	</h1>
)

export const H2 = ({ children }: Props) => (
	<h1
		css={css`
			font-size: 1.3rem;
		`}
	>
		{children}
	</h1>
)

export const H3 = ({ children }: Props) => (
	<h1
		css={css`
			font-size: 1.2rem;
		`}
	>
		{children}
	</h1>
)
