export type LocalStorageData = {
	favorites?: Array<string>
	cart?: Array<string>
}

// should validate if there's data, so we dont use garbage?
const getLocalStorageData = (): LocalStorageData => {
	const data = localStorage.getItem('shoppr-data')

	if (data) {
		return JSON.parse(data) as LocalStorageData
	}
	return {}
}

const setLocalStorageData = (data: LocalStorageData) => {
	localStorage.setItem('shoppr-data', JSON.stringify(data))
}

export const clientStorage = {
	getLocalStorageData,
	setLocalStorageData,
}
