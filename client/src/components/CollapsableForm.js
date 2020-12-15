import { Box, Button, makeStyles, TextField } from '@material-ui/core'
import { useFormik } from 'formik'
import * as yup from 'yup'

const useStyles = makeStyles(theme => ({
	root: { padding: theme.spacing(2) },
	textField: {
		marginBottom: theme.spacing(2),
	},
}))

const initialValues = {
	email: '',
	regNo: '',
}

const validationSchema = yup.object({
	email: yup
		.string('Enter your email')
		.email('Enter a valid email')
		.required('Email is required'),
	regNo: yup
		.string('Enter your Registration No.')
		.trim()
		.matches(
			/^20[0-9]{2}\/(FM|E|ET|BST|SB|SP|CSC|BAD|C|A|L|B|V|AD|AG|PHA|MLS|NUR)\/[0-9]{3}$/,
			'Enter valid Registration No.'
		)
		.required('Registration No. is required'),
})

const onSubmit = () => {}

function CollapsableForm() {
	const classes = useStyles()
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit,
	})

	return (
		<Box className={classes.root}>
			<form onSubmit={formik.handleSubmit}>
				<TextField
					required
					variant='outlined'
					className={classes.textField}
					size='small'
					name='regNo'
					label='Registration No.'
					value={formik.values.regNo}
					onChange={formik.handleChange}
					error={formik.touched.regNo && Boolean(formik.errors.regNo)}
					helperText={formik.touched.regNo && formik.errors.regNo}
				/>
				<TextField
					required
					variant='outlined'
					className={classes.textField}
					size='small'
					name='email'
					label='Email'
					value={formik.values.email}
					onChange={formik.handleChange}
					error={formik.touched.email && Boolean(formik.errors.email)}
					helperText={formik.touched.email && formik.errors.email}
				/>
				<Button
					type='submit'
					size='small'
					variant='contained'
					color='secondary'
					style={{ marginLeft: 'auto', marginRight: '0' }}
				>
					Request Application
				</Button>
			</form>
		</Box>
	)
}

export default CollapsableForm
