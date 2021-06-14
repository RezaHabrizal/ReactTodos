import { createStore } from 'redux'

const initialState = {
	tasks: [],
}

function reducer(state = initialState, action) {
	const { type, payload } = action
	switch (type) {
		case 'tasks/setTasks':
			return { ...state, tasks: payload }
		case 'tasks/addTask':
			return { ...state, tasks: state.tasks.concat(payload) }
		case 'tasks/deleteTask':
			return {
				...state,
				tasks: state.tasks.filter((task) => task.id !== payload),
			}
		default:
			return state
	}
}

let store = createStore(reducer)

export default store
