export type CssValueType = string | number

type SpaceSuffixes = '' | 't' | 'r' | 'b' | 'l' | 'x' | 'y'
export type SpaceProps = Partial<
	{
		[key in `m${SpaceSuffixes}`]: CssValueType
	} & {
		[key in `p${SpaceSuffixes}`]: CssValueType
	}
>

type ColorPropNames = 'text' | 'bg' | 'opacity'
export type ColorProps = Partial<{
	[key in ColorPropNames]: CssValueType
}>

type TypographyPropNames = 'fontSize' | 'fontWeight'
export type TypographyProps = Partial<{
	[key in TypographyPropNames]: CssValueType
}>

type LayoutPropNames =
	| 'w'
	| 'h'
	| 'minW'
	| 'minH'
	| 'maxW'
	| 'maxH'
	| 'display'
	| 'overflow'
	| 'overflowX'
	| 'overflowY'
export type LayoutProps = Partial<{
	[key in LayoutPropNames]: CssValueType
}>

type PositionPropNames = 'top' | 'right' | 'bottom' | 'left' | 'z' | 'position'
export type PositionProps = Partial<{
	[key in PositionPropNames]: CssValueType
}>
