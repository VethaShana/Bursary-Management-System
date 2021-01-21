import React, { useState } from 'react'
import {
	Container,
	Grid,
	makeStyles,
	Typography,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Button,
	Divider,
	Box,
	ListSubheader,
	Collapse,
	TextField,
	Link as MuiLink,
} from '@material-ui/core'
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined'
import ArrowRightAltOutlinedIcon from '@material-ui/icons/ArrowRightAltOutlined'
import bgImg from '../assets/bg1.svg'

import Copyright from '../components/Copyright'
import Register from '../components/Register'
import Login from '../components/Login'

const useStyles = makeStyles(theme => ({
	gridHalf: {
		padding: `${theme.spacing(8)}px ${theme.spacing(3)}px`,
		[theme.breakpoints.down('sm')]: {
			paddingBottom: theme.spacing(0),
		},
	},
	banner: {
		backgroundColor: theme.palette.secondary.main,
		backgroundImage: `url(${bgImg})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: '400px',
		backgroundPosition: 'center bottom',
		overflow: 'hidden',
		flex: 1,
		marginTop: theme.spacing(2),
		borderRadius: theme.shape.borderRadius,
		padding: theme.spacing(6),
		width: '100%',
		maxWidth: '600px',
		[theme.breakpoints.down('sm')]: {
			backgroundSize: '350px',
		},
		[theme.breakpoints.down('xs')]: {
			height: '500px',
			flex: 'none',
			backgroundSize: '250px',
			padding: theme.spacing(3),
			marginTop: theme.spacing(3),
			marginBottom: theme.spacing(5),
		},
	},
	faq: {
		float: 'right',
		[theme.breakpoints.down('xs')]: {
			width: '100%',
			float: 'none',
		},
	},
	authContainer: {
		maxWidth: '450px',
		[theme.breakpoints.down('xs')]: {
			marginTop: theme.spacing(8),
		},
	},
}))

const helpMail = 'help@welfare.jfn.ac.lk'

function Landing() {
	const classes = useStyles()
	const [authView, setAuthView] = useState('register')

	const handleAuthViewChange = () => {
		setAuthView(authView === 'register' ? 'login' : 'register')
	}

	return (
		<Container maxWidth='lg'>
			<Grid
				container
				style={{ minHeight: '100vh' }}
				spacing={3}
				direction='column'
			>
				<Grid container style={{ flex: 1 }}>
					<Grid
						container
						item
						xs={12}
						sm={6}
						direction='column'
						justify='space-between'
						className={classes.gridHalf}
					>
						<Box>
							<header>
								<Typography variant='h3' style={{ fontWeight: 'bold' }}>
									University of Jaffna
								</Typography>
								<Typography variant='h5'>Welfare Department</Typography>
							</header>
						</Box>
						<Box className={classes.authContainer}>
							<Register
								authView={authView}
								onAuthViewChange={handleAuthViewChange}
							/>
							<Login
								authView={authView}
								onAuthViewChange={handleAuthViewChange}
							/>
						</Box>
					</Grid>
					<Grid
						container
						item
						xs={12}
						sm={6}
						direction='column'
						className={classes.gridHalf}
					>
						<Box>
							<Button
								className={classes.faq}
								color='primary'
								endIcon={<ArrowRightAltOutlinedIcon />}
								variant='text'
							>
								FAQ
							</Button>
						</Box>
						<Box className={classes.banner} alignSelf='flex-end'>
							<Typography
								variant='h5'
								color='primary'
								style={{ fontWeight: 'bold' }}
								gutterBottom
							>
								Need help?
							</Typography>
							<Typography variant='subtitle1' color='primary'>
								Contact Bursary Department at{' '}
								<MuiLink
									style={{ fontWeight: '700' }}
									color='primary'
									href={'mailto:' + helpMail}
								>
									{helpMail}
								</MuiLink>
							</Typography>
						</Box>
					</Grid>
				</Grid>
				<Grid
					container
					item
					xs={12}
					direction='column'
					justify='space-between'
					style={{ height: 'min-content' }}
				>
					<footer>
						<Copyright />
					</footer>
				</Grid>
			</Grid>
		</Container>
	)
}

export default Landing
