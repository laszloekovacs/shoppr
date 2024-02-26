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

globalStyle('body', {
	margin: 0,
	backgroundColor: 'beige'
})

globalStyle('html', {
	boxSizing: 'border-box',
	fontFamily: 'Roboto'
})

globalFontFace('Roboto', {
	src: 'url(https://fonts.googleapis.com/css2?family=Roboto&display=swap)'
})
