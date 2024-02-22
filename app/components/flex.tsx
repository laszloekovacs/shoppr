import { flexRecipe, type flexVariants } from './flex.css'

type Props = {
	children: React.ReactNode
} & flexVariants

export const Flex = ({ children, dir, justify }: Props) => (
	<div className={flexRecipe({ dir, justify })}>{children}</div>
)
