import {
	CLEAR_USER_ERROR,
	REGISTER_USER,
	REGISTER_USER_FAILURE,
	REGISTER_USER_SUCCESS,
	LOGIN_USER,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	SET_USER
} from '../actions/types'

const initialState = {
	data: {
		name: null,
		role: null,
		token: null
	},
	isLoading: false,
	error: null
}

export function user(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { ...state, data: action.payload }
		case REGISTER_USER:
			return { ...state, isLoading: true, error: null }
		case REGISTER_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload,
				error: null
			}
		case REGISTER_USER_FAILURE:
			return { ...state, isLoading: false, error: action.payload }
		case LOGIN_USER:
			return { ...state, isLoading: true, error: null }
		case LOGIN_USER_SUCCESS:
			return {
				...state,
				isLoading: false,
				data: action.payload,
				error: null
			}
		case LOGIN_USER_FAILURE:
			return { ...state, isLoading: false, error: action.payload }
		case CLEAR_USER_ERROR:
			return { ...state, error: null }
		default:
			return state
	}
}
