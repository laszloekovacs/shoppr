import styled from '@emotion/styled'
import { space, layout, color, border, typography } from 'styled-system'
import type {
	SpaceProps,
	LayoutProps,
	TypographyProps,
	ColorProps,
	BorderProps,
} from 'styled-system'

type Props = SpaceProps &
	LayoutProps &
	TypographyProps &
	ColorProps &
	BorderProps

export const Box = styled.div<Props>`
	${space}
	${layout}
	${typography}
	${color}
	${border}
`
