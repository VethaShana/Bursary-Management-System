import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PersonIcon from '@material-ui/icons/Person'
import SettingsIcon from '@material-ui/icons/Settings'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'
import UpdateOutlinedIcon from '@material-ui/icons/UpdateOutlined'
import PaymentIcon from '@material-ui/icons/Payment'
import ListItemText from '@material-ui/core/ListItemText'
import { Link, useRouteMatch } from 'react-router-dom'

export const MainListItems = () => {
	let match = useRouteMatch()
	return (
		<div>
			<ListItem button component={Link} to={match.url}>
				<ListItemIcon>
					<DashboardIcon fontSize='small' />
				</ListItemIcon>
				<ListItemText primary='Dashboard' />
			</ListItem>
			<ListItem button component={Link} to={`${match.url}/students`}>
				<ListItemIcon>
					<SupervisedUserCircleIcon fontSize='small' />
				</ListItemIcon>
				<ListItemText primary='Students' />
			</ListItem>
			<ListItem button component={Link} to={`${match.url}/applications`}>
				<ListItemIcon>
					<UpdateOutlinedIcon />
				</ListItemIcon>
				<ListItemText primary='Pending Applications' />
			</ListItem>
			<ListItem button component={Link} to={`${match.url}/installments`}>
				<ListItemIcon>
					<PaymentIcon fontSize='small' />
				</ListItemIcon>
				<ListItemText primary='Installments' />
			</ListItem>
		</div>
	)
}

export const SecondaryListItems = () => {
	let match = useRouteMatch()
	return (
		<div>
			<ListItem button component={Link} to={`${match.url}/users`}>
				<ListItemIcon>
					<PersonIcon fontSize='small' />
				</ListItemIcon>
				<ListItemText primary='Users' />
			</ListItem>
			<ListItem button component={Link} to={`${match.url}/settings`}>
				<ListItemIcon>
					<SettingsIcon fontSize='small' />
				</ListItemIcon>
				<ListItemText primary='Settings' />
			</ListItem>
		</div>
	)
}
