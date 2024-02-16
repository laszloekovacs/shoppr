import React from 'react'
import styled from '@emotion/styled'
import { theme } from './theme'

const DynamicElement = ({ as: Element = 'span', ...props }) =>
	React.createElement(Element, props, props.children)

export const Text = styled(DynamicElement)`
	font-size: ${(props) => props.fontSize || '1rem'};
	color: ${(props) => props.color || theme.colors.body.text};
`
