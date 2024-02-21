import styled from '@emotion/styled'
import { css } from '@emotion/react'
import type { Theme } from './theme'

const breakpoints = ['32px', '768px', '1024px']
const mq = breakpoints.map(bp => `@media (min-width: ${bp})`)

const dynamicStyle = (
	props: { m?: string; p?: string } & { theme?: Theme }
) => {
	const { m, p } = props

	return css`
		margin: ${m ?? m};

		padding: ${p ?? p};
	`
}

export const DynamicDiv = styled.div`
	${dynamicStyle}
`
