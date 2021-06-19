import axios from 'axios'

import {
	SET_APPLICATION,
	SUBMIT_APPLICATION,
	SUBMIT_APPLICATION_SUCCESS,
	SUBMIT_APPLICATION_FAILURE,
	SET_APPLICATION_STATUS
} from './types'

export const setApplication = data => {
	return {
		type: SET_APPLICATION,
		payload: data
	}
}

export const getApplicationStatus = () => async (dispatch, getState) => {
	const userId = getState().user.data._id
	return await axios
		.get(`/students/${userId}`)
		.then(({ data }) => {
			setApplication(data)
			dispatch({
				type: SET_APPLICATION_STATUS,
				payload: {
					isSubmitted: true,
					isApproved: data.isApproved
				}
			})
		})
		.catch(error => {
			dispatch({
				type: SET_APPLICATION_STATUS,
				payload: {
					isSubmitted: false,
					isApproved: false
				}
			})
			console.log(error)
		})
}

export const submitApplication = () => async (dispatch, getState) => {
	dispatch({
		type: SUBMIT_APPLICATION
	})
	const data = getState().application.data
	return await axios
		.post('/students', data)
		.then(() => {
			dispatch({
				type: SUBMIT_APPLICATION_SUCCESS
			})
		})
		.catch(err => {
			dispatch({
				type: SUBMIT_APPLICATION_FAILURE,
				payload: {
					status: err.response.status,
					msg: err.response.data.error
				}
			})
		})
}
