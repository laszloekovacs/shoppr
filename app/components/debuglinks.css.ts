import { style } from '@vanilla-extract/css'

export const container = style({
	backgroundColor: 'tomato',
	border: '1px solid black',
})

export const nav = style({
	display: 'flex',
	flexDirection: 'row',
	gap: '1rem',
})
