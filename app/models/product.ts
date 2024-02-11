export interface ProductSchema {
	_id: string
	product: string
	price: string
	type: 'shoes' | 'watches'
}

export interface WatchesSchema extends ProductSchema {
	type: 'watches'
	movement: string
}

export interface ShoesSchema extends ProductSchema {
	type: 'shoes'
	size: number
}
