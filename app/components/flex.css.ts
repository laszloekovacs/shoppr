import { RecipeVariants, recipe } from '@vanilla-extract/recipes'

export const flexRecipe = recipe({
	base: {
		display: 'flex',
		gap: '1rem',
	},

	variants: {
		dir: {
			row: { flexDirection: 'row' },
			col: { flexDirection: 'column' },
		},
		justify: {
			start: { justifyContent: 'flex-start' },
			end: { justifyContent: 'flex-end' },
			center: { justifyContent: 'center' },
			around: { justifyContent: 'space-around' },
			between: { justifyContent: 'space-between' },
			evenly: { justifyContent: 'space-evenly' },
		},
	},
})

export type flexVariants = RecipeVariants<typeof flexRecipe>
