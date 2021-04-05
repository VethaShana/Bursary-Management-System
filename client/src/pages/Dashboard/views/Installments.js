import React from 'react'
import { Grid, makeStyles, Paper, Button } from '@material-ui/core'
import clsx from 'clsx'
import Card from '../components/panels/Card'
import Installment from '../components/tables/Installment'
import StudentChart from '../components/panels/StudentChart'
import Instalment from '../components/panels/Instalment'

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		// height: 240,
	},
}))

function Installments() {
	const classes = useStyles()
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
	return (
		<>
			<Grid container spacing={3}>
				<Grid item xs={12} md={6} xl={3}>
					<Paper className={classes.paper}>
						<Instalment />
					</Paper>
				</Grid>

				{/* Enhanced Table */}
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Installment />
					</Paper>
				</Grid>
			</Grid>
		</>
	)
}

export default Installments
