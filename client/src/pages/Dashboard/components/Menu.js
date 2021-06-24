import React, { forwardRef, useImperativeHandle } from 'react'
import { default as MuiMenu } from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../../actions/user'

const Menu = forwardRef((props, ref) => {
	const [anchorEl, setAnchorEl] = React.useState(null)
	const dispatch = useDispatch()
	const user = useSelector(state => state.user.data)

	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	useImperativeHandle(ref, () => {
		return {
			handleClick: handleClick
		}
	})

	return (
		<div>
			<MuiMenu
				id="menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				variant="selectedMenu"
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right'
				}}
				transformOrigin={{
					vertical: 'bottom',
					horizontal: 'right'
				}}
				disabledItemsFocusable={false}
			>
				<MenuItem disabled dense>
					{user.firstName} {user.lastName}
				</MenuItem>
				<MenuItem onClick={() => dispatch(logoutUser())} dense>
					Logout
				</MenuItem>
			</MuiMenu>
		</div>
	)
})

export default Menu
