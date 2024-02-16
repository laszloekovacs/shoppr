import styled from '@emotion/styled'

const Button = styled.button<{ $variant: 'small' | 'large' }>`
	background: #bf4f74;
	border: 1px solid black;
	border-radius: 5px;
	padding: 5px;
	color: white;
`

export default Button
