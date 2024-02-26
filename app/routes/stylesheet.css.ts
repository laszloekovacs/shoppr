import { style } from '@vanilla-extract/css'

export const container = style({
	containerType: 'inline-size'
})

export const card = style({
	backgroundColor: 'burlywood',

	'@container': {
		'(width > 400px)': {
			backgroundColor: 'lightblue'
		}
	}
})
