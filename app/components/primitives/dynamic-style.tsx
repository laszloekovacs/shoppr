import styled from '@emotion/styled'
import { css } from '@emotion/react'
import theme from './theme'

type Theme = typeof theme

type SizeProps = {
	margin?: string | number
	m?: string | number
	padding?: string | number
	p?: string | number
}

const dynamicStyle = (props: SizeProps & { theme?: Theme }) => {
	const { margin, m, padding, p } = props

	return css`
		margin: ${margin ?? margin};
		margin: ${m ?? m};
		padding: ${padding ?? padding};
		padding: ${p ?? p};
	`
}

export const DynamicDiv = styled.div`
	${dynamicStyle}
`
