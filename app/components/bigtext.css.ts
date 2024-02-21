import { style, createTheme } from '@vanilla-extract/css'

export const [themeClass, vars] = createTheme({
	colors: {
		brand: 'aquamarine',
		accent: 'honeydew',
	},
})

export const bigText = style({
	color: vars.colors.accent,
	fontSize: '5rem',
})
