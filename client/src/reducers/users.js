import {
	SET_USERS,
	ADD_USERS,
	SET_USERS_LOADING,
	SET_USERS_ERRORS,
	REMOVE_USERS
} from '../actions/types'

const initialState = {
	data: [],
	isLoading: false,
	errors: undefined
}

export function users(state = initialState, action) {
	switch (action.type) {
		case SET_USERS:
			return { ...state, data: action.payload }
		case ADD_USERS:
			return { ...state, data: [...state.data, action.payload] }
		case SET_USERS_LOADING:
			return { ...state, isLoading: action.payload }
		case SET_USERS_ERRORS:
			return { ...state, errors: action.payload }
		case REMOVE_USERS:
			return {
				...state,
				data: state.data.filter(({ _id }) => _id !== action.payload)
			}
		default:
			return state
	}
}
