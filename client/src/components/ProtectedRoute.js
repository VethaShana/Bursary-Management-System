import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
	user: state.user.data,
	isLoading: state.user.isLoading
})

const mapDispatchToProps = {}

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
	console.log(user)
	return (
		<Route
			{...rest}
			render={props => {
				return user ? (
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
