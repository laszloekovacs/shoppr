import { Global, css } from '@emotion/react'

export const GlobalStyles = () => (
	<Global
		styles={css`
			:root {
				font-family: system-ui, sans-serif;
				font-size: 16px;
				line-height: 1.2;
				font-weight: 400;
			}

			* {
				box-sizing: border-box;
				margin: 0;
				padding: 0;
			}

			ul,
			li,
			ol {
				list-style: none;
			}

			img {
				max-width: 100%;
				max-height: auto;
			}

			a {
				color: inherit;
				text-decoration: none;
				font-weight: 600;
			}

			button,
			input {
				font-size: inherit;
				font-weight: inherit;
				font-family: inherit;
				line-height: inherit;
				cursor: pointer;
				border: none;
				border-radius: 0;
			}

			input {
				border: 1px solid gray;
			}
		`}
	/>
)
