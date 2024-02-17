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
			ol {
				list-style: none;
			}

			img {
				max-width: 100%;
				max-height: auto;
			}
		`}
	/>
)
