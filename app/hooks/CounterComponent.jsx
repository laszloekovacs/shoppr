import React from 'react'
import useAsyncReducer from "./useAsyncReducer"


const reducer = (state, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return {
				count: state.count + 1,
			}
		case 'DECREMENT':
			return {
				count: state.count - 1,
			}
		default:
			return state
	}
}

const asyncIncrementThunk = () => {
	return async (dispatch) => {
		
		await new Promise((resolve) => setTimeout(resolve, 1000))

		dispatch({ type: 'INCREMENT' })
	}
}

const CounterComponent = () => {
	const initialState = {
		count: 0,
	}

	const [state, dispatch] = useAsyncReducer(reducer, initialState)
	return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onClick={() => dispatch(asyncIncrementThunk)}>Increment (Async)</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
    </div>
  );
}

export default CounterComponent