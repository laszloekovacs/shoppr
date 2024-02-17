import styled from '@emotion/styled'
import type { Theme } from './theme-provider'

interface Props {
	theme?: Theme
}

export const Box = styled.div<Props>`
	border: 1px solid ${(props) => props.theme.color.border};
	background-color: rgba(230, 155, 93, 0.1);
`
