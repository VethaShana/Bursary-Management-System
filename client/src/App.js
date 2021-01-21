import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import theme from './utils/theme'

import Landing from './pages/Landing'
import Application from './pages/Application'
import ExtendedApplication from './pages/ExtendedApplication'
import SignIn from './pages/Dashboard/pages/SignIn'
import SignUp from './pages/Dashboard/pages/SignUp'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Switch>
				<Route exact path='/' component={Landing} />
				<Route path='/application' component={Application} />
				<Route path='/extended-application' component={ExtendedApplication} />
				<Route path='/dashboard/signin' component={SignIn} />
				<Route path='/dashboard/signup' component={SignUp} />
				<Route path='/dashboard' component={Dashboard} />
			</Switch>
		</MuiThemeProvider>
	)
}

export default App
