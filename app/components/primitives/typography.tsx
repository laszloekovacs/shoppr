import styled from '@emotion/styled'
import { Theme } from './theme-provider'

type Props = {
	fontSize?: keyof Theme['fontSize']
	theme?: Theme
	bold?: boolean
}

export const Typography = styled.span<Props>`
	color: ${(props) => props.theme.color.text};
	font-size: ${(props) => props.theme.fontSize[props.fontSize ?? 'base']};
	font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
`
