import React from 'react'
import {
	Typography,
	List as MuiList,
	ListItem,
	ListItemText,
	ListItemAvatar,
	makeStyles,
	Avatar,
	ListItemSecondaryAction,
	IconButton,
	MenuItem,
	Menu
} from '@material-ui/core/'
import MoreVertIcon from '@material-ui/icons/MoreVert'

const data = [
	{
		title: 'Mr',
		name: 'Nandasena',
		faculty: 'Science'
	},
	{
		title: 'Mr',
		name: 'Sampath Bandara',
		faculty: 'Arts'
	},
	{
		title: 'Mrs',
		name: 'Pushpalatha',
		faculty: 'Law'
	}
]

const useContextMenuStyles = makeStyles(theme => ({
	root: {},
	delete: {
		background: theme.palette.error.main,
		color: theme.palette.getContrastText(theme.palette.error.main),
		'&:hover': {
			background: theme.palette.error.main
		}
	}
}))

const ContextMenu = () => {
	const classes = useContextMenuStyles()
	const [anchorEl, setAnchorEl] = React.useState(null)

	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<>
			<IconButton
				aria-label="actions"
				aria-controls="context-menu"
				aria-haspopup="true"
				onClick={handleClick}
				size="small"
			>
				<MoreVertIcon fontSize="small" />
			</IconButton>

			<Menu
				id="context-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem dense onClick={handleClose}>
					Edit
				</MenuItem>
				<MenuItem dense onClick={handleClose}>
					Approve
				</MenuItem>
				<MenuItem
					dense
					onClick={handleClose}
					className={classes.delete}
				>
					Delete
				</MenuItem>
			</Menu>
		</>
	)
}

ContextMenu.propTypes = {
	// numSelected: PropTypes.number.isRequired,
}

const getInitials = name => {
	const nameArr = name.split(' ')
	if (nameArr.length >= 2) return nameArr[0].charAt(0) + nameArr[1].charAt(0)
	return nameArr[0].charAt(0)
}

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		maxWidth: 752
	},
	demo: {
		backgroundColor: theme.palette.background.paper
	},
	avatar: {
		color: theme.palette.getContrastText(theme.palette.secondary.main),
		backgroundColor: theme.palette.secondary.main,
		fontWeight: theme.typography.fontWeightMedium,
		fontSize: theme.typography.fontSize
	}
}))

const List = () => {
	const classes = useStyles()
	return (
		<>
			<Typography
				component="h2"
				variant="h6"
				color="primary"
				gutterBottom
			>
				Active Users
			</Typography>
			<div className={classes.demo}>
				<MuiList dense>
					{data.map(({ title, name, faculty, img }, idx) => (
						<ListItem key={idx}>
							<ListItemAvatar>
								<Avatar
									className={classes.avatar}
									alt={name}
									src={img}
								>
									{getInitials(name)}
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={`${title}. ${name}`}
								secondary={faculty}
							/>
							<ListItemSecondaryAction>
								<ContextMenu />
							</ListItemSecondaryAction>
						</ListItem>
					))}
				</MuiList>
			</div>
		</>
	)
}

export default List
