import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

const theme = responsiveFontSizes(
	createMuiTheme({
		palette: {
			primary: {
				// main: deepPurple["A401"],
				main: '#6C63FF',
				dark: '#8982ff',
				light: '#4b45b2',
			},
			background: {
				default: 'pink',
			},
		},
		typography: {
			fontFamily: 'Barlow',
		},
		shape: {
			// borderRadius: 6,
		},

		//overrides
		overrides: {
			MuiButton: {
				root: {
					// textTransform: "none",
				},
			},
			MuiPaper: {
				outlined: {
					// border: "1px solid rgba(101, 31, 255, 0.2)",
				},
			},
			MuiChip: {
				sizeSmall: {
					borderRadius: '4px',
				},
			},
			MuiListItem: {},
		},

		//props
		props: {
			MuiButton: {
				disableRipple: true,
				disableElevation: true,
				variant: 'outlined',
			},
			MuiPaper: {
				elevation: 0,
				variant: 'outlined',
			},
			MuiTextField: {
				variant: 'outlined',
				size: 'small',
				fullWidth: true,
				InputLabelProps: {
					shrink: true,
				},
			},
			MuiListItem: {
				disableRipple: true,
			},
		},
	})
)

export default theme
