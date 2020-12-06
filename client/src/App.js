import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import theme from './utils/theme'

import LandingPage from './pages/LandingPage'
import ApplicationPage from './pages/ApplicationPage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import DashboardPage from './pages/DashboardPage';

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<Switch>
				<Route exact path='/' component={LandingPage} />
				<Route exact path='/application' component={ApplicationPage} />
				<Route exact path='/signin' component={SignIn} />
				<Route exact path='/signup' component={SignUp} />
        <Route exact path="/dashboard" component={DashboardPage} />
			</Switch>
		</MuiThemeProvider>
	)
}

export default App
