import styled from '@emotion/styled'

interface Props {
	dir?: 'row' | 'column'
	gap?: string
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
	gap: ${({ gap }) => gap ?? '1rem'};
	justify-content: ${({ justifyContent }) => justifyContent ?? 'flex-start'};
`
