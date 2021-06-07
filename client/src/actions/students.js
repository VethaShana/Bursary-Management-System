import axios from 'axios'

import {
	SET_STUDENTS,
	SET_STUDENTS_ERRORS,
	SET_STUDENTS_LOADING,
	APPROVE_STUDENT,
	DISAPPROVE_STUDENT,
	REMOVE_STUDENT,
	ADD_INSTALLMENT
} from './types'

export const getStudents = () => async (dispatch, getState) => {
	dispatch({
		type: SET_STUDENTS_LOADING,
		payload: true
	})
	await axios
		.get('/students')
		.then(res => {
			dispatch({
				type: SET_STUDENTS,
				payload: res.data
			})
			dispatch({
				type: SET_STUDENTS_LOADING,
				payload: false
			})
		})
		.catch(err => {
			dispatch({
				type: SET_STUDENTS_ERRORS,
				payload: err.response.data.error
			})
		})
}

export const deleteStudent = id => async (dispatch, getState) => {
	await axios
		.delete(`/students/${id}`)
		.then(res => {
			dispatch({
				type: REMOVE_STUDENT,
				payload: id
			})
		})
		.catch(err => {
			dispatch({
				type: SET_STUDENTS_ERRORS,
				payload: err.response.data.error
			})
		})
}

export const approveStudent = id => async (dispatch, getState) => {
	const student = getState().students.data.find(({ _id }) => _id === id)
	await axios
		.put(`/students/${id}`, { ...student, isApproved: true })
		.then(res => {
			dispatch({ type: APPROVE_STUDENT })
			dispatch(getStudents())
		})
		.catch(err => {
			dispatch({
				type: SET_STUDENTS_ERRORS,
				payload: err.response.data.error
			})
		})
}

export const disApproveStudent = id => async (dispatch, getState) => {
	const student = getState().students.data.find(({ _id }) => _id === id)
	await axios
		.put(`/students/${id}`, { ...student, isApproved: false })
		.then(res => {
			dispatch({ type: DISAPPROVE_STUDENT })
			dispatch(getStudents())
		})
		.catch(err => {
			dispatch({
				type: SET_STUDENTS_ERRORS,
				payload: err.response.data.error
			})
		})
}

export const addInstallment = data => async (dispatch, getState) => {
	await axios
		.post(`/installments/`, data)
		.then(res => {
			dispatch({ type: ADD_INSTALLMENT })
			dispatch(getStudents())
		})
		.catch(err => {
			dispatch({
				type: SET_STUDENTS_ERRORS,
				payload: err.response.data.error
			})
		})
}
