import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
	isAuthenticated: state.user.isAuthenticated,
	isLoading: state.user.isLoading
})

const mapDispatchToProps = {}

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props => {
				return isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: '/', state: { from: props.location } }}
					/>
				)
			}}
		/>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute)
