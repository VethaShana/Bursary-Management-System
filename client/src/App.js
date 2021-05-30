import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { CssBaseline, Snackbar } from '@material-ui/core'
import theme from './utils/theme'

import Landing from './pages/Landing'
import Application from './pages/Application'
import ExtendedApplication from './pages/ExtendedApplication'
import SignIn from './pages/Dashboard/pages/SignIn'
import SignUp from './pages/Dashboard/pages/SignUp'
import Dashboard from './pages/Dashboard/Dashboard'
import { connect } from 'react-redux'
import Alert from '@material-ui/lab/Alert'

import ProtectedRoute from './components/ProtectedRoute'

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
				<ProtectedRoute path="/application" component={Application} />
				<ProtectedRoute
					path="/extended-application"
					component={ExtendedApplication}
				/>
				<Route path="/dashboard/sign-in" component={SignIn} />
				<Route path="/dashboard/sign-up" component={SignUp} />
				<ProtectedRoute path="/dashboard" component={Dashboard} />
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
