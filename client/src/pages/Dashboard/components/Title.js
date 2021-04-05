import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { Paper } from '@material-ui/core'

export default function Title({ title, description }) {
	return (
		<Paper>
			<Typography component='h2' variant='h6' color='primary' gutterBottom>
				{title}
			</Typography>
			<Typography component='h2' variant='body1' color='primary' gutterBottom>
				{description}
			</Typography>
		</Paper>
	)
}

Title.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
}
