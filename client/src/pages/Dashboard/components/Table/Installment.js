import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { lighten, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import MuiTableHead from '@material-ui/core/TableHead'
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

import { Button, Menu, MenuItem } from '@material-ui/core'

function createData(regNo, nic, name, district, courseOfStudy, grossIncome) {
	return { regNo, nic, name, district, courseOfStudy, grossIncome }
}

const rows = [
	createData(
		'2017/CSC/045',
		'961803420V',
		'Z. M Ardil',
		'Kandy',
		'Computer Science',
		125000.0
	),
	createData(
		'2017/CSC/021',
		'963083448V',
		'Isuru Lakmal',
		'Anudradhapura',
		'Computer Science',
		220000.0
	),
	createData(
		'2017/CSC/017',
		'964028018V',
		'Ramesh Perera',
		'Galle',
		'Computer Science',
		130000.0
	),
]

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
		disablePadding: true,
		label: 'Registration No.',
	},
	{ id: 'nic', numeric: false, disablePadding: false, label: 'NIC' },
	{
		id: 'name',
		numeric: false,
		disablePadding: false,
		label: 'Name with Initials',
	},
	{ id: 'district', numeric: false, disablePadding: false, label: 'District' },
	{
		id: 'courseOfStudy',
		numeric: false,
		disablePadding: false,
		label: 'Course of Study',
	},
	{
		id: 'grossIncome',
		numeric: true,
		disablePadding: false,
		label: 'Gross Income',
	},
]

function TableHead(props) {
	const {
		classes,
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort,
	} = props
	const createSortHandler = property => event => {
		onRequestSort(event, property)
	}

	return (
		<MuiTableHead>
			<TableRow>
				<TableCell padding='checkbox'>
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{ 'aria-label': 'select all desserts' }}
						size='small'
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
									{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
				<TableCell />
			</TableRow>
		</MuiTableHead>
	)
}

TableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(['asc', 'desc']).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired,
}

const useToolbarStyles = makeStyles(theme => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
	},
	highlight:
		theme.palette.type === 'light'
			? {
					color: theme.palette.primary.main,
					backgroundColor: lighten(theme.palette.secondary.main, 0.85),
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark,
			  },
	title: {
		flex: '1 1 100%',
	},
}))

const TableToolbar = props => {
	const classes = useToolbarStyles()
	const { numSelected } = props

	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0,
			})}
		>
			{numSelected > 0 ? (
				<Typography
					className={classes.title}
					color='inherit'
					variant='subtitle1'
					component='div'
				>
					{numSelected} selected
				</Typography>
			) : (
				<Typography
					className={classes.title}
					variant='h6'
					id='tableTitle'
					component='div'
				>
					{/* Students */}
				</Typography>
			)}

			{numSelected > 0 ? (
				<Tooltip title='Delete'>
					<IconButton aria-label='delete'>
						<DeleteIcon fontSize='small' />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title='Filter list'>
					<IconButton aria-label='filter list'>
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	)
}

TableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired,
}

const useContextMenuStyles = makeStyles(theme => ({
	root: {},
	delete: {
		background: theme.palette.error.main,
		color: theme.palette.getContrastText(theme.palette.error.main),
		'&:hover': {
			background: theme.palette.error.main,
		},
	},
}))

const ContextMenu = () => {
	const classes = useContextMenuStyles()
	const [anchorEl, setAnchorEl] = React.useState(null)

	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<div>
			<IconButton
				aria-label='actions'
				aria-controls='context-menu'
				aria-haspopup='true'
				onClick={handleClick}
				size='small'
			>
				<MoreVertIcon fontSize='small' />
			</IconButton>

			<Menu
				id='context-menu'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem dense onClick={handleClose}>
					Edit
				</MenuItem>
				<MenuItem dense onClick={handleClose} className={classes.delete}>
					Delete
				</MenuItem>
			</Menu>
		</div>
	)
}

ContextMenu.propTypes = {
	// numSelected: PropTypes.number.isRequired,
}

const Row = props => {
	const { row, isItemSelected, labelId, handleClick } = props
	const [open, setOpen] = React.useState(false)

	return (
		<TableRow
			hover
			// onClick={event => handleClick(event, row.regNo)}
			role='checkbox'
			aria-checked={isItemSelected}
			tabIndex={-1}
			key={row.regNo}
			selected={isItemSelected}
		>
			<TableCell padding='checkbox'>
				<Checkbox
					checked={isItemSelected}
					inputProps={{ 'aria-labelledby': labelId }}
					size='small'
					onClick={event => handleClick(event, row.regNo)}
				/>
			</TableCell>
			<TableCell>
				<IconButton
					aria-label='expand row'
					size='small'
					onClick={e => {
						e.preventDefault()
						setOpen(!open)
					}}
				>
					{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
				</IconButton>
			</TableCell>
			<TableCell component='th' id={labelId} scope='row' padding='none'>
				{row.regNo}
			</TableCell>
			<TableCell align='left'>{row.nic}</TableCell>
			<TableCell align='left'>{row.name}</TableCell>
			<TableCell align='left'>{row.district}</TableCell>
			<TableCell align='left'>{row.courseOfStudy}</TableCell>
			<TableCell align='right'>{row.grossIncome}</TableCell>
			<TableCell align='right'>
				<ContextMenu />
			</TableCell>
		</TableRow>
	)
}

const useStyles = makeStyles(theme => ({
	table: {
		minWidth: 750,
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
		width: 1,
	},
}))

export default function Installment() {
	const classes = useStyles()
	const [order, setOrder] = React.useState('asc')
	const [orderBy, setOrderBy] = React.useState('grossIncome')
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
		<>
			<TableToolbar numSelected={selected.length} />
			<TableContainer>
				<Table
					className={classes.table}
					aria-labelledby='tableTitle'
					size='small'
					aria-label='enhanced table'
				>
					<TableHead
						classes={classes}
						numSelected={selected.length}
						order={order}
						orderBy={orderBy}
						onSelectAllClick={handleSelectAllClick}
						onRequestSort={handleRequestSort}
						rowCount={rows.length}
					/>
					<TableBody>
						{stableSort(rows, getComparator(order, orderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, index) => {
								const isItemSelected = isSelected(row.regNo)
								const labelId = `enhanced-table-checkbox-${index}`

								return (
									<Row
										row={row}
										labelId={labelId}
										isItemSelected={isItemSelected}
										handleClick={handleClick}
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
				component='div'
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</>
	)
}
