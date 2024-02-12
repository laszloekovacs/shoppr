import { z } from 'zod'

/* base product */
export interface ProductSchema {
	name: string
	brand: string
	department: string
	isPublished: boolean
	attribute: Array<ProductAttribute>
	options: Array<ProductOption>
}

export function isProductSchema(product: any): product is ProductSchema {
	if (
		'name' in product &&
		'brand' in product &&
		'department' in product &&
		'isPublished' in product &&
		'attribute' in product &&
		'options' in product &&
		Array.isArray(product['attribute']) &&
		Array.isArray(product['options'])
	) {
		return true
	}

	return false
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
