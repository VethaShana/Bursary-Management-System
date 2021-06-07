import axios from 'axios'
import {
	SET_USER,
	REGISTER_USER,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	LOGIN_USER,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
<<<<<<< HEAD
	CLEAR_USER_ERROR,
	CLEAR_USER
} from './types'
import ROLES from '../utils/roles'
=======
	LOGOUT_USER,
	CLEAR_USER_ERROR,
	CLEAR_USER
} from './types'
import jwtDecode from 'jwt-decode'
import { setAuthToken } from '../utils/token'
>>>>>>> 5d0d5be93a043dca6dc2ab83f205c743ae635079

export const setUser = data => {
	return {
		type: SET_USER,
		payload: data
	}
}

<<<<<<< HEAD
export const registerUser =
=======
export const registerStudent =
>>>>>>> 5d0d5be93a043dca6dc2ab83f205c743ae635079
	(data, history, formikHelpers) => async (dispatch, getState) => {
		dispatch({
			type: REGISTER_USER
		})
		return await axios
			.post('/auth/register', data)
<<<<<<< HEAD
			.then(({ data: { _id, email, role, token } }) => {
				localStorage.setItem('token', token)
				dispatch({
					type: REGISTER_USER_SUCCESS,
					payload: { _id, email, role }
				})
				role === ROLES.STUDENT
					? history.push('/application')
					: history.push('/dashboard')
=======
			.then(({ data: { token } }) => {
				localStorage.setItem('token', token)
				const decoded = jwtDecode(token)
				setAuthToken(token)
				dispatch({
					type: REGISTER_USER_SUCCESS,
					payload: decoded.user
				})
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

export const registerUser =
	(data, history, formikHelpers) => async (dispatch, getState) => {
		dispatch({
			type: REGISTER_USER
		})
		return await axios
			.post('/auth/register?role=dean', data)
			.then(({ data: { token } }) => {
				localStorage.setItem('token', token)
				const decoded = jwtDecode(token)
				dispatch({
					type: REGISTER_USER_SUCCESS,
					payload: decoded.user
				})
>>>>>>> 5d0d5be93a043dca6dc2ab83f205c743ae635079
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
<<<<<<< HEAD
			.then(({ data: { _id, email, role, token } }) => {
				localStorage.setItem('token', token)
				dispatch({
					type: LOGIN_USER_SUCCESS,
					payload: { _id, email, role }
				})
				role === ROLES.STUDENT
					? history.push('/application')
					: history.push('/dashboard')
=======
			.then(({ data: { token } }) => {
				localStorage.setItem('token', token)
				console.log(token)
				setAuthToken(token)
				const decoded = jwtDecode(token)
				dispatch({
					type: LOGIN_USER_SUCCESS,
					payload: decoded.user
				})
>>>>>>> 5d0d5be93a043dca6dc2ab83f205c743ae635079
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
<<<<<<< HEAD
	delete axios.defaults.headers.common['x-auth-token']
	dispatch({
		type: CLEAR_USER
=======
	setAuthToken(false)
	dispatch({
		type: LOGOUT_USER
>>>>>>> 5d0d5be93a043dca6dc2ab83f205c743ae635079
	})
}
