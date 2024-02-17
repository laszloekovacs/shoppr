import styled from '@emotion/styled'

interface Props {
	dir?: 'row' | 'column'
	gap?: string
	pad?: string
	justifyContent?:
		| 'center'
		| 'space-between'
		| 'space-around'
		| 'space-evenly'
		| 'flex-end'
		| 'flex-start'
}

export const Flex = styled.div<Props>`
	display: flex;
	flex-direction: ${({ dir }) => dir ?? 'row'};
	justify-content: ${({ justifyContent }) => justifyContent ?? 'flex-start'};
	gap: ${({ gap }) => gap};
	padding: ${({ pad }) => pad};
`
