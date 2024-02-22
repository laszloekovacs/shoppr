import { globalStyle } from '@vanilla-extract/css'

globalStyle('html, body', {
	boxSizing: 'border-box',
	overflowX: 'hidden',
	minHeight: '100vh',
	margin: 0,
	padding: 0,

	fontSize: 16,
	fontFamily: 'inter, sans-serif',
	fontWeight: 400,
	fontStyle: 'normal',
})

globalStyle('*, *::before, *::after', {
	boxSizing: 'inherit',
})

globalStyle('img', {
	maxWidth: '100%',
	height: 'auto',
})

globalStyle('button, input', {
	fontFamily: 'inherit',
	fontSize: 'inherit',
	fontWeight: 'inherit',
})

globalStyle('li', {
	listStyle: 'none',
})
