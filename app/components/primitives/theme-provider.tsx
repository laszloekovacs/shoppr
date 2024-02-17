import { ThemeProvider } from '@emotion/react'

const theme = {
	color: {
		text: '#000',
		background: '#fff',
		border: 'grey',
		brand: 'green',
		success: 'green',
		danger: 'red',
		warning: 'orange',
		info: 'blue',
		light: 'lightgrey',
		dark: 'darkgrey',
	},
	fontSize: {
		xs: '0.75rem',
		sm: '0.875rem',
		base: '1rem',
		lg: '1.125rem',
		xl: '1.25rem',
		'2xl': '1.5rem',
		'3xl': '1.875rem',
		'4xl': '2.25rem',
		'5xl': '3rem',
		'6xl': '4rem',
		'7xl': '5rem',
	},
}

export interface Theme {
	color: (typeof theme)['color']
	fontSize: (typeof theme)['fontSize']
}

export default function ThemeProviderWrapper({
	children,
}: {
	children: React.ReactNode
}) {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
