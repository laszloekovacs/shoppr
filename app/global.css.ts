import {
	globalStyle,
	createTheme,
	style,
	globalFontFace
} from '@vanilla-extract/css'

export const theme = createTheme({
	primary: style({
		color: 'blue'
	}),
	secondary: style({
		color: 'red'
	})
})

const CairoFont = 'Cairo'
globalFontFace(CairoFont, {
	src: 'url(https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&display=swap)'
})

globalStyle('html', {
	boxSizing: 'border-box',
	fontFamily: [CairoFont, 'sans-serif'].join(', ')
})

globalStyle('body', {
	margin: 0,
	backgroundColor: 'beige'
})

globalStyle('.w-1', {
	width: '1em'
})

globalStyle('li', {
	listStyle: 'none'
})
