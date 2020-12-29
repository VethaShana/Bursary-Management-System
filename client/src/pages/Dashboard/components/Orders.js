import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '2017/csc/016', '#000','isuru lakmal', '953521565V', '40000', ),
  createData(1, '2017/SP/055', '#111','isuru lakmal', '953521565V', '80000', ),
  createData(2, '2017/CSC/016', '#000','isuru lakmal', '953521565V', '40000', ),
  createData(3, '2017/SP/055', '#111','isuru lakmal', '953521565V', '80000', ),
 
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
  
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Student Details</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Registration #</TableCell>
            <TableCell>Busary #</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>ID Number</TableCell>
            <TableCell align="right"> Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more Details
        </Link>
      </div>
    </React.Fragment>
  );
}