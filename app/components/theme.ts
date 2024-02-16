import facepaint from 'facepaint'

export const breakpoints = [320, 420, 768, 1024, 1440]

export const mq = facepaint(
	breakpoints.map((bp) => `@media (min-width: ${bp}px)`)
)

/* should use theme provider and whatnot */
export const theme = {
	colors: {
		body: {
			bg: '#f5f5f5',
			text: 'black',
		},
	},
}
