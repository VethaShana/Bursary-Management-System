import { combineReducers } from 'redux'
import { user } from './user'
import { students } from './students'
import { application } from './application'

export default combineReducers({
	user,
	students,
	application
})
