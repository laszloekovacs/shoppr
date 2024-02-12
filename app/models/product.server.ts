import { z } from 'zod'
import { ObjectId } from '~/services/db.server'

/* base product */
export interface ProductSchema {
	name: string
	brand: string
	department: string
	isPublished: boolean
	attribute: Array<ProductAttribute>
	options: Array<ProductOption>
}

/* attributes like storage size, material, movement etc. */
export interface ProductAttribute {
	name: string
	displayName: string
	value: string | number | boolean
	unit?: string
}

/* various options for a product like XL shirt, M shirt */
export interface ProductOption {
	name: string
	price: number
	discount?: number
	isDiscounted: boolean
	sku: string
	stock: number
}

const productOptionSchema = z.object({
	name: z.string().min(3),
	price: z.number().gt(0).int(),
	discount: z.number().gt(1).int().optional(),
	isDiscounted: z.boolean(),
	sku: z.string().min(3),
	stock: z.number().int(),
})

export type ProductOptionSchema = z.infer<typeof productOptionSchema>
