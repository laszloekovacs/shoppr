import { style } from '@vanilla-extract/css'

export const container = style({
	display: 'flex',
	gap: '0.4rem',
	background: 'antiquewhite',
	padding: '0.4rem',
	height: 'min-content'
})

export const link = style({
	textDecoration: 'dotted'
})
