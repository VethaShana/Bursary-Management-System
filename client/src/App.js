import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { CssBaseline, Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import theme from './utils/theme'

import Landing from './pages/Landing'
import Application from './pages/Application'
import ExtendedApplication from './pages/ExtendedApplication'
import SignIn from './pages/Dashboard/pages/SignIn'
import SignUp from './pages/Dashboard/pages/SignUp'
import Dashboard from './pages/Dashboard/Dashboard'

import { connect } from 'react-redux'
import store from './store'
import { setUser, logoutUser } from './actions/user'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import ROLES from './utils/roles'

import ProtectedRoute from './components/ProtectedRoute'

const setAuthToken = token => {
	if (token) {
		axios.defaults.headers.common['x-auth-token'] =
			localStorage.getItem('token')
	} else {
		delete axios.defaults.headers.common['x-auth-token']
	}
}

if (localStorage.token) {
	setAuthToken(localStorage.token)
	const decoded = jwtDecode(localStorage.token)
	store.dispatch(setUser(decoded.user))

	const currentTime = Date.now() / 1000
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser())
		window.location.href = '/'
	}
}

const handleClose = (event, reason) => {
	if (reason === 'clickaway') {
		return
	}
}

function App({ error }) {
	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Switch>
				<Route exact path="/" component={Landing} />
				<ProtectedRoute
					path="/application"
					role={[ROLES.STUDENT]}
					component={Application}
				/>
				<ProtectedRoute
					path="/extended-application"
					component={ExtendedApplication}
					role={[ROLES.STUDENT]}
				/>
				<Route path="/dashboard/sign-in" component={SignIn} />
				<Route path="/dashboard/sign-up" component={SignUp} />
				<ProtectedRoute
					path="/dashboard"
					role={[ROLES.ADMIN, ROLES.DEAN]}
					component={Dashboard}
				/>
				<Route path="*" component={() => '404 NOT FOUND'} />
			</Switch>
			<Snackbar
				open={error ? true : false}
				autoHideDuration={6000}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				onClose={handleClose}
			>
				<Alert onClose={handleClose} severity="error">
					{error && error.msg}
				</Alert>
			</Snackbar>
		</MuiThemeProvider>
	)
}

const mapStateToProps = state => ({
	error: state.user.error
})

export default connect(mapStateToProps)(App)
