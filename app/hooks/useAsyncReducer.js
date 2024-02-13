import { useState } from 'react'

const useAsyncReducer = (reducer, initialState) => {
	const [state, setState] = useState(initialState)

	const dispatch = async (action) => {
		if (typeof action === 'function') {
			await action(dispatch)
		} else {
			const newState = reducer(state, action)
			setState(newState)
		}
	}

	return [state, dispatch]
}

export default useAsyncReducer
