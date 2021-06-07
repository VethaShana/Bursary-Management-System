import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { lighten, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Box, Button, Collapse, Grid, Menu, MenuItem } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import { connect, useDispatch } from 'react-redux'
import {
	getStudents,
	deleteStudent,
	approveStudent,
	disApproveStudent
} from '../../../actions/students'

const mapStateToProps = state => ({
	students: state.students.data,
	isLoading: state.students.isLoading
})

const mapDispatchToProps = { getStudents }

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1
	}
	if (b[orderBy] > a[orderBy]) {
		return 1
	}
	return 0
}

function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index])
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0])
		if (order !== 0) return order
		return a[1] - b[1]
	})
	return stabilizedThis.map(el => el[0])
}

const headCells = [
	{
		id: 'regNo',
		numeric: false,
		disablePadding: false,
		label: 'Registration No.',
		skeleton: true
	},
	{
		id: 'nic',
		numeric: false,
		disablePadding: false,
		label: 'NIC',
		skeleton: true
	},
	{
		id: 'nameWithInitials',
		numeric: false,
		disablePadding: false,
		label: 'Name with Initials',
		skeleton: true
	},
	{
		id: 'district',
		numeric: false,
		disablePadding: false,
		label: 'District',
		skeleton: true
	},
	{
		id: 'faculty',
		numeric: false,
		disablePadding: false,
		label: 'Faculty',
		skeleton: true
	},
	{
		id: 'netIncome',
		numeric: true,
		disablePadding: false,
		label: 'Net Income',
		skeleton: true
	},
	{
		id: 'status',
		numeric: true,
		disablePadding: false,
		label: 'Status',
		skeleton: true
	}
]

function PendingApplicationsTable(props) {
	const {
		classes,
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort
	} = props
	const createSortHandler = property => event => {
		onRequestSort(event, property)
	}

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						indeterminate={
							numSelected > 0 && numSelected < rowCount
						}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{ 'aria-label': 'select all desserts' }}
						size="small"
					/>
				</TableCell>
				<TableCell />
				{headCells.map(headCell => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === headCell.id ? order : false}
					>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : 'asc'}
							onClick={createSortHandler(headCell.id)}
						>
							{headCell.label}
							{orderBy === headCell.id ? (
								<span className={classes.visuallyHidden}>
									{order === 'desc'
										? 'sorted descending'
										: 'sorted ascending'}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
				<TableCell />
			</TableRow>
		</TableHead>
	)
}

PendingApplicationsTable.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired
}

const useToolbarStyles = makeStyles(theme => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1)
	},
	highlight:
		theme.palette.type === 'light'
			? {
					color: theme.palette.primary.main,
					backgroundColor: lighten(theme.palette.secondary.main, 0.85)
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark
			  },
	title: {
		flex: '1 1 100%'
	}
}))

const EnhancedTableToolbar = props => {
	const classes = useToolbarStyles()
	const { numSelected } = props

	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0
			})}
		>
			{numSelected > 0 ? (
				<Typography
					className={classes.title}
					color="inherit"
					variant="subtitle1"
					component="div"
				>
					{numSelected} selected
				</Typography>
			) : (
				<Typography
					className={classes.title}
					variant="h6"
					id="tableTitle"
					component="div"
				>
					{/* Students */}
				</Typography>
			)}

			{numSelected > 0 ? (
				<Tooltip title="Delete">
					<IconButton aria-label="delete">
						<DeleteIcon fontSize="small" />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Filter list">
					<IconButton aria-label="filter list">
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	)
}

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired
}

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

const ContextMenu = ({ id }) => {
	const classes = useContextMenuStyles()
	const [anchorEl, setAnchorEl] = React.useState(null)
	const dispatch = useDispatch()
	console.log(id)

	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<div>
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
				onClose={handleClick}
			>
				<MenuItem dense onClick={handleClose}>
					Edit
				</MenuItem>
				<MenuItem
					dense
					onClick={e => {
						dispatch(deleteStudent(id))
						handleClick(e)
					}}
					className={classes.delete}
				>
					Delete
				</MenuItem>
			</Menu>
		</div>
	)
}

ContextMenu.propTypes = {
	// numSelected: PropTypes.number.isRequired,
}

const useRowStyles = makeStyles({
	root: {
		'& > *': {
			borderBottom: 'unset'
		}
	}
})

const Row = props => {
	const classes = useRowStyles()
	const { row, isItemSelected, labelId, handleClick } = props
	const [open, setOpen] = React.useState(false)
	const dispatch = useDispatch()
	console.log(row)
	return (
		<React.Fragment>
			<TableRow
				hover
				// onClick={event => handleClick(event, row.regNo)}
				role="checkbox"
				aria-checked={isItemSelected}
				tabIndex={-1}
				key={row.regNo}
				selected={isItemSelected}
				className={classes.root}
			>
				<TableCell padding="checkbox">
					<Checkbox
						checked={isItemSelected}
						inputProps={{ 'aria-labelledby': labelId }}
						size="small"
						onClick={event => handleClick(event, row.regNo)}
					/>
				</TableCell>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={e => {
							e.preventDefault()
							setOpen(!open)
						}}
					>
						{open ? (
							<KeyboardArrowUpIcon />
						) : (
							<KeyboardArrowDownIcon />
						)}
					</IconButton>
				</TableCell>
				<TableCell component="th" id={labelId} scope="row">
					{row.regNo}
				</TableCell>
				<TableCell align="left">{row.nic}</TableCell>
				<TableCell align="left">{row.nameWithInitials}</TableCell>
				<TableCell align="left">{row.district}</TableCell>
				<TableCell align="left">{row.faculty}</TableCell>
				<TableCell align="right">Rs. {row.netIncome}</TableCell>
				<TableCell align="right">
					{row.isApproved ? (
						<Button
							color="secondary"
							size="small"
							variant="contained"
							onClick={() => dispatch(disApproveStudent(row._id))}
						>
							Approved
						</Button>
					) : (
						<Button
							color="secondary"
							size="small"
							variant="contained"
							onClick={() => dispatch(approveStudent(row._id))}
						>
							Approve
						</Button>
					)}
				</TableCell>
				<TableCell align="right">
					<ContextMenu id={row._id} />
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={2}
				></TableCell>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={7}
				>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box margin={1}>
							<Typography
								variant="button"
								gutterBottom
								component="div"
							>
								Other details
							</Typography>
							<Grid container spacing={2}>
								{/* <Grid item xs={12}>
									<Typography
										gutterBottom
										variant="subtitle2"
									>
										Income Information
									</Typography>
								</Grid> */}
								<Grid item xs={12} md={4}>
									<Typography
										variant="subtitle1"
										component="div"
									>
										Father
									</Typography>
									<Box
										display="flex"
										justifyContent="space-between"
									>
										<Typography
											variant="body2"
											color="textSecondary"
										>
											House &amp; Property
										</Typography>
										<Typography
											variant="body2"
											color="textSecondary"
										>
											Rs.
											{
												row.father.annualIncome
													.houseAndProperty
											}
										</Typography>
									</Box>
									<Box
										display="flex"
										justifyContent="space-between"
									>
										<Typography
											variant="body2"
											color="textSecondary"
										>
											Occupation / Pension
										</Typography>
										<Typography
											variant="body2"
											color="textSecondary"
										>
											Rs.
											{
												row.father.annualIncome
													.occupationOrPension
											}
										</Typography>
									</Box>
									<Box
										display="flex"
										justifyContent="space-between"
									>
										<Typography
											variant="body2"
											color="textSecondary"
										>
											Other sources
										</Typography>
										<Typography
											variant="body2"
											color="textSecondary"
										>
											Rs.
											{
												row.father.annualIncome
													.otherSources
											}
										</Typography>
									</Box>
									<Box
										display="flex"
										justifyContent="space-between"
									>
										<Typography
											variant="body2"
											color="textSecondary"
										>
											Salary
										</Typography>
										<Typography
											variant="body2"
											color="textSecondary"
										>
											Rs.
											{row.father.employment.salary}
										</Typography>
									</Box>
								</Grid>
								<Grid item xs={12} md={4}>
									<Typography
										variant="subtitle1"
										component="div"
									>
										Mother
									</Typography>
									<Box
										display="flex"
										justifyContent="space-between"
									>
										<Typography
											variant="body2"
											color="textSecondary"
										>
											House &amp; Property
										</Typography>
										<Typography
											variant="body2"
											color="textSecondary"
										>
											Rs.
											{
												row.mother.annualIncome
													.houseAndProperty
											}
										</Typography>
									</Box>
									<Box
										display="flex"
										justifyContent="space-between"
									>
										<Typography
											variant="body2"
											color="textSecondary"
										>
											Occupation / Pension
										</Typography>
										<Typography
											variant="body2"
											color="textSecondary"
										>
											Rs.
											{
												row.mother.annualIncome
													.occupationOrPension
											}
										</Typography>
									</Box>
									<Box
										display="flex"
										justifyContent="space-between"
									>
										<Typography
											variant="body2"
											color="textSecondary"
										>
											Other sources
										</Typography>
										<Typography
											variant="body2"
											color="textSecondary"
										>
											Rs.
											{
												row.mother.annualIncome
													.otherSources
											}
										</Typography>
									</Box>
									<Box
										display="flex"
										justifyContent="space-between"
									>
										<Typography
											variant="body2"
											color="textSecondary"
										>
											Salary
										</Typography>
										<Typography
											variant="body2"
											color="textSecondary"
										>
											Rs.
											{row.mother.employment.salary}
										</Typography>
									</Box>
								</Grid>
								<Grid item xs={12} md={4}>
									<Typography
										variant="subtitle1"
										component="div"
									>
										Guardian
									</Typography>
									<Box
										display="flex"
										justifyContent="space-between"
									>
										<Typography
											variant="body2"
											color="textSecondary"
										>
											Salary
										</Typography>
										<Typography
											variant="body2"
											color="textSecondary"
										>
											Rs.
											{row.guardian.annualIncome.salary}
										</Typography>
									</Box>
									<Box
										display="flex"
										justifyContent="space-between"
									>
										<Typography
											variant="body2"
											color="textSecondary"
										>
											House / Property / Temple
										</Typography>
										<Typography
											variant="body2"
											color="textSecondary"
										>
											Rs.
											{
												row.guardian.annualIncome
													.houseAndPropertyOrTemple
											}
										</Typography>
									</Box>
								</Grid>
							</Grid>
						</Box>
					</Collapse>
				</TableCell>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={1}
				></TableCell>
			</TableRow>
		</React.Fragment>
	)
}

const RowSkeleton = () => {
	return (
		<TableRow>
			<TableCell padding="checkbox">
				<Skeleton />
			</TableCell>
			<TableCell></TableCell>
			{headCells.map(({ skeleton }, key) => {
				return skeleton ? (
					<TableCell key>
						<Skeleton />
					</TableCell>
				) : (
					<TableCell key></TableCell>
				)
			})}
		</TableRow>
	)
}

const useStyles = makeStyles(theme => ({
	table: {
		minWidth: 750
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1
	}
}))

const EnhancedTable = props => {
	const { students: rows, isLoading } = props
	// const { students, isLoading } = props
	const classes = useStyles()
	const [order, setOrder] = React.useState('asc')
	const [orderBy, setOrderBy] = React.useState('netIncome')
	const [selected, setSelected] = React.useState([])
	const [page, setPage] = React.useState(0)
	const [rowsPerPage, setRowsPerPage] = React.useState(5)

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const handleSelectAllClick = event => {
		if (event.target.checked) {
			const newSelecteds = rows.map(n => n.regNo)
			setSelected(newSelecteds)
			return
		}
		setSelected([])
	}

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name)
		let newSelected = []

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name)
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1))
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1))
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			)
		}

		setSelected(newSelected)
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	const isSelected = name => selected.indexOf(name) !== -1

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

	return (
		<React.Fragment>
			<EnhancedTableToolbar numSelected={selected.length} />
			<TableContainer>
				<Table
					className={classes.table}
					aria-labelledby="tableTitle"
					size="small"
					aria-label="enhanced table"
				>
					<PendingApplicationsTable
						classes={classes}
						numSelected={selected.length}
						order={order}
						orderBy={orderBy}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={rows.length}
					/>
					<TableBody>
						{isLoading &&
							[...Array(rowsPerPage)].map((x, i) => (
								<RowSkeleton key={i} />
							))}
						{!isLoading &&
							stableSort(rows, getComparator(order, orderBy))
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map((row, index) => {
									const isItemSelected = isSelected(row.regNo)
									const labelId = `enhanced-table-checkbox-${index}`

									return (
										<Row
											row={row}
											labelId={labelId}
											isItemSelected={isItemSelected}
											handleClick={handleClick}
											key={index}
										/>
									)
								})}
						{/* {emptyRows > 0 && (
							<TableRow style={{ height: (false ? 33 : 53) * emptyRows }}>
								<TableCell colSpan={6} />
							</TableRow>
						)} */}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</React.Fragment>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTable)
