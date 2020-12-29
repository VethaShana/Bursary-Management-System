import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import theme from './utils/theme'

import Landing from './pages/Landing'
import Application from './pages/Application'
import ExtendedApplication from './pages/ExtendedApplication'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Switch>
				<Route exact path='/' component={Landing} />
				<Route exact path='/application' component={Application} />
				<Route
					exact
					path='/extended-application'
					component={ExtendedApplication}
				/>
				<Route exact path='/signin' component={SignIn} />
				<Route exact path='/signup' component={SignUp} />
				<Route exact path='/dashboard' component={Dashboard} />
			</Switch>
		</MuiThemeProvider>
	)
}

export default App
