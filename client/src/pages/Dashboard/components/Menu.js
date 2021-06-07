import React, { forwardRef, useImperativeHandle } from 'react'
import { default as MuiMenu } from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../../actions/user'

const Menu = forwardRef((props, ref) => {
	const [anchorEl, setAnchorEl] = React.useState(null)
	const dispatch = useDispatch()

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
			>
				{/* <MenuItem onClick={handleClose}>Profile</MenuItem>
				<MenuItem onClick={handleClose}>My account</MenuItem> */}
				<MenuItem onClick={() => dispatch(logoutUser())}>
					Logout
				</MenuItem>
			</MuiMenu>
		</div>
	)
})

export default Menu
