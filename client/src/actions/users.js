import axios from 'axios'

import { SET_USERS, SET_USERS_ERRORS, SET_USERS_LOADING } from './types'

export const setUsers = data => {
	return {
		type: SET_USERS,
		payload: data
	}
}

export const getInstallments = () => async (dispatch, getState) => {
	dispatch({
		type: SET_USERS_LOADING,
		payload: true
	})
	await axios
		.get('/users')
		.then(res => {
			dispatch({
				type: SET_USERS,
				payload: res.data
			})
			dispatch({
				type: SET_USERS_LOADING,
				payload: false
			})
		})
		.catch(err => {
			dispatch({
				type: SET_USERS_ERRORS,
				payload: err.response.data.error
			})
		})
}
