import { flexRecipe } from './box.css'
import type { flexVariants } from './box.css'

type Props = {
	children: React.ReactNode
} & flexVariants

export const Flex = ({ children, dir, justify }: Props) => (
	<div className={flexRecipe({ dir, justify })}>{children}</div>
)
