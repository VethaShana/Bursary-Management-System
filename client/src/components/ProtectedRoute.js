import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
	return <Route />
}

export default ProtectedRoute
