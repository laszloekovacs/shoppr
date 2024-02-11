import { z } from 'zod'

const schema = z.object({
	things: z.string(),
})

export type Product = z.infer<typeof schema>
