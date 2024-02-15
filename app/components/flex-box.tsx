/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import React from 'react'

interface Props {
	children: React.ReactNode
	gap?: string
	dir?: string
}

const Flex = ({ dir, gap, children }: Props) => {
	return (
		<div
			css={css`
				display: flex;
				flex-direction: ${dir ? dir : 'row'};
				gap: ${gap ? gap : '0.2rem'};
			`}
		>
			{children}
		</div>
	)
}

export default Flex
