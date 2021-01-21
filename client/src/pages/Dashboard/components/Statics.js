import React from 'react'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from './Title'

function preventDefault(event) {
	event.preventDefault()
}

const useStyles = makeStyles({
	staticsContext: {
		flex: 1,
	},
})

export default function Statics() {
	const classes = useStyles()
	return (
		<React.Fragment>
			<Title>Recent Deposits</Title>
			<Typography component='p' variant='h4'>
				Rs. 3,075,000.00
			</Typography>
			<Typography color='textSecondary' className={classes.staticsContext}>
				on 15 March, 2021
			</Typography>
			<div>
				<Link color='primary' href='#' onClick={preventDefault}>
					View statistics
				</Link>
			</div>
		</React.Fragment>
	)
}
