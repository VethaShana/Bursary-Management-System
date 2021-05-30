import axios from 'axios'
import {
	REGISTER_USER,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	LOGIN_USER,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	CLEAR_USER_ERROR
} from './types'
import ROLES from '../utils/roles'

export const registerUser =
	(data, history, formikHelpers) => async (dispatch, getState) => {
		dispatch({
			type: REGISTER_USER
		})
		return await axios
			.post('/auth/register', data)
			.then(
				({
					data: { _id, email, role, accessToken: token, refreshToken }
				}) => {
					localStorage.setItem('refreshToken', refreshToken)
					dispatch({
						type: REGISTER_USER_SUCCESS,
						payload: { _id, email, role, token }
					})
					role === ROLES.STUDENT
						? history.push('/application')
						: history.push('/dashboard')
				}
			)
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
		console.log(formikHelpers)
		dispatch({
			type: LOGIN_USER
		})
		return await axios
			.post('/auth/login', data)
			.then(
				({
					data: { _id, email, role, accessToken: token, refreshToken }
				}) => {
					localStorage.setItem('refreshToken', refreshToken)
					dispatch({
						type: LOGIN_USER_SUCCESS,
						payload: { _id, email, role, token }
					})
					role === ROLES.STUDENT
						? history.push('/application')
						: history.push('/dashboard')
				}
			)
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
