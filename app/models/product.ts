import { z } from 'zod'

// https://zod.dev/

const baseProductSchema = z.object({
	name: z.string(),
	brand: z.string(),
	department: z.string(),
})

// extend base schema
const watchSchema = baseProductSchema.extend({
	price: z.number(),
	movement: z.string(),
	color: z.string(),
})

const mywatch = watchSchema.parse({
	name: 'My watch',
	brand: 'My brand',
	department: 'My department',
	price: 100,
	movement: 'My movement',
	color: 'My color',
})
