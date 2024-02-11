import type { WithId, Document } from 'mongodb'

export interface Department extends WithId<Document> {
	name: string
	brand: string
}

export default Department
