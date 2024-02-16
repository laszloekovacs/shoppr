import styled from '@emotion/styled'

export const Flex = styled.div<{ direction?: 'row' | 'column'; gap?: string }>`
	display: flex;
	flex-direction: ${({ direction }) => direction ?? 'row'};
	gap: ${({ gap }) => gap ?? '1ch'};
`
