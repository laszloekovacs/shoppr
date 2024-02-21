import styled from '@emotion/styled'
import { css } from '@emotion/react'
import type { Theme } from './theme'
import { CssValueType, SpaceProps } from './dynamic-style.d'

const system = (prop: CssValueType, theme: Theme) => {
	if (typeof prop === 'undefined') {
		return null
	}

	if (typeof prop === 'number') {
		// try to look up in the theme definition
	}
}

const space = (props: SpaceProps & { theme?: Theme }) => {
	return css`
		margin: ${props.m};
	`
}

const dynamicStyle = (props: SpaceProps & { theme?: Theme }) => {
	const { m, p } = props

	return css`
		margin: ${m ?? m};

		padding: ${p ?? p};
	`
}

export const DynamicDiv = styled.div`
	${dynamicStyle}
`
