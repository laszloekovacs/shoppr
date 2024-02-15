/* base product */
export interface ProductSchema {
	name: string
	brand: string
	department: string
	isPublished?: boolean
	images?: Array<string>
	attributes?: Array<ProductAttributeSchema>
	options?: Array<ProductOptionSchema>
}

/* attributes like storage size, material, movement etc. */
export interface ProductAttributeSchema {
	name: string
	displayName: string
	value: string | number | boolean
	unit?: string
}

/* various options for a product like XL shirt, M shirt */
export interface ProductOptionSchema {
	name: string
	price: number
	discount?: number
	isDiscounted: boolean
	sku: string
	stock: number
}

export function isProductOption(obj: any): obj is ProductOptionSchema {
	if (
		typeof obj.name == 'string' &&
		typeof obj.price == 'number' &&
		('discount' in obj ? typeof obj.discount == 'number' : true) &&
		typeof obj.isDiscounted == 'boolean' &&
		typeof obj.sku == 'string' &&
		typeof obj.stock == 'number'
	) {
		return true
	}
	return false
}

export function isProductSchema(obj: any): obj is ProductSchema {
	if (
		typeof obj.name == 'string' &&
		typeof obj.brand == 'string' &&
		typeof obj.department == 'string' &&
		typeof obj.isPublished == 'boolean' &&
		Array.isArray(obj.images) &&
		obj.images.every((i: any) => typeof i == 'string') &&
		Array.isArray(obj.attributes) &&
		obj.attributes.every(isProductAttribute) &&
		Array.isArray(obj.options) &&
		obj.options.every(isProductOption)
	) {
		return true
	}
	return false
}

export function isProductAttribute(obj: any): obj is ProductAttributeSchema {
	if (
		typeof obj.name == 'string' &&
		typeof obj.displayName == 'string' &&
		['string', 'number', 'boolean'].includes(typeof obj.value) &&
		('unit' in obj ? typeof obj.unit == 'string' : true)
	) {
		return true
	}
	return false
}
