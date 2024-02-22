import { style } from '@vanilla-extract/css'

export const container = style({
	backgroundColor: 'white',
	border: '1px solid black',
	position: 'absolute',
	bottom: '1rem',
})

export const nav = style({
	display: 'flex',
	flexDirection: 'row',
	gap: '1rem',
})
