import React from 'react'
import { Link } from 'react-router-dom'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { makeStyles } from '@material-ui/core/styles'

import { Container, IconButton } from '@material-ui/core'

const faqs = [
	{
		question: 'How to do something',
		answer: 'This is how'
	},
	{
		question: 'How to do something 2',
		answer: 'This is how 2'
	}
]

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
	}
}))

function FAQ() {
	const classes = useStyles()

	return (
		<Container>
			<Button component={Link} to="/">
				Home
			</Button>
			{faqs.map(faq => (
				<Accordion>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<Typography className={classes.heading}>
							{faq.question}
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography>{faq.answer}</Typography>
					</AccordionDetails>
				</Accordion>
			))}
		</Container>
	)
}

export default FAQ
