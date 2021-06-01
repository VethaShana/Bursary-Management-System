import axios from 'axios'
import {
	SET_USER,
	REGISTER_USER,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	LOGIN_USER,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	CLEAR_USER_ERROR,
	CLEAR_USER
} from './types'
import ROLES from '../utils/roles'

export const setUser = data => {
	return {
		type: SET_USER,
		payload: data
	}
}

export const registerUser =
	(data, history, formikHelpers) => async (dispatch, getState) => {
		dispatch({
			type: REGISTER_USER
		})
		return await axios
			.post('/auth/register', data)
			.then(({ data: { _id, email, role, token } }) => {
				localStorage.setItem('token', token)
				dispatch({
					type: REGISTER_USER_SUCCESS,
					payload: { _id, email, role }
				})
				role === ROLES.STUDENT
					? history.push('/application')
					: history.push('/dashboard')
			})
			.catch(err => {
				dispatch({
					type: REGISTER_USER_FAILURE,
					payload: {
						status: err.response.status,
						msg: err.response.data.error
					}
				})
				setTimeout(() => {
					dispatch({ type: CLEAR_USER_ERROR })
				}, 6000)
			})
	}

export const loginUser =
	(data, history, formikHelpers) => async (dispatch, getState) => {
		dispatch({
			type: LOGIN_USER
		})
		return await axios
			.post('/auth/login', data)
			.then(({ data: { _id, email, role, token } }) => {
				localStorage.setItem('token', token)
				dispatch({
					type: LOGIN_USER_SUCCESS,
					payload: { _id, email, role }
				})
				role === ROLES.STUDENT
					? history.push('/application')
					: history.push('/dashboard')
			})
			.catch(err => {
				dispatch({
					type: LOGIN_USER_FAILURE,
					payload: {
						status: err.response.status,
						msg: err.response.data.error
					}
				})
				setTimeout(() => {
					dispatch({ type: CLEAR_USER_ERROR })
				}, 6000)
			})
	}

export const logoutUser = () => dispatch => {
	localStorage.removeItem('token')
	delete axios.defaults.headers.common['x-auth-token']
	dispatch({
		type: CLEAR_USER
	})
}
