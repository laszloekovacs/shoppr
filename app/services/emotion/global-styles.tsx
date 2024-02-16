/** @jsxImportSource @emotion/react */
import facepaint from 'facepaint'
import { Global, css } from '@emotion/react'

export const breakpoints = [320, 420, 768, 1024, 1440]

export const mq = facepaint(
	breakpoints.map((bp) => `@media (min-width: ${bp}px)`)
)

const GlobalStyles = () => (
	<Global
		styles={css`
			* {
				box-sizing: border-box;
				margin: 0;
				padding: 0;
			}
			body {
				background-color: #f9f9f9;
				font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
					Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
			}
			li {
				list-style-type: none;
			}
		`}
	/>
)

export default GlobalStyles
