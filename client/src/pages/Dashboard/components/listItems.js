import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import DashboardIcon from '@material-ui/icons/Dashboard'
import SettingsIcon from '@material-ui/icons/Settings'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import PaymentIcon from '@material-ui/icons/Payment'
import DescriptionIcon from '@material-ui/icons/Description'
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
					<AssignmentIndIcon fontSize='small' />
				</ListItemIcon>
				<ListItemText primary='Students' />
			</ListItem>
			<ListItem button component={Link} to={`${match.url}/applications`}>
				<ListItemIcon>
					<DescriptionIcon fontSize='small' />
				</ListItemIcon>
				<ListItemText primary='Applications' />
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
					<SupervisedUserCircleIcon fontSize='small' />
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
