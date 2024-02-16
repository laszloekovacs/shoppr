/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { Theme } from './theme-provider'

type Props = {
	fontSize?: keyof Theme['fontSize']
	theme?: Theme
}

export const Text = styled.span<Props>((props) => ({
	color: props.theme.color.text,
	fontSize: props.theme.fontSize[props.fontSize ?? 'base'],
}))
