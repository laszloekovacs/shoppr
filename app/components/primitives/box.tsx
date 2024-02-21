import styled from '@emotion/styled'
import { space, layout, typography, color, border } from 'styled-system'
import type {
	SpaceProps,
	LayoutProps,
	TypographyProps,
	ColorProps,
	BorderProps,
} from 'styled-system'

type Props = SpaceProps &
	BorderProps &
	LayoutProps &
	TypographyProps &
	ColorProps

export const Box = styled.div<Props>`
	${space}
	${layout}
	${typography}
	${color}
	${border}
`
