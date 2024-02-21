/* base product */
export type ProductSchema = {
	name: string
	brand: string
	department: string
	isPublished?: boolean
	images?: Array<string>
	attributes?: Array<string | number | boolean>
	variants?: Array<{
		kind: string
		price: number
	}>
}
