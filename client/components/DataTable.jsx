import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props) {
  const classes = useStyles();

  function createData(name, cheapest, standard, nicest) {
    return { name, cheapest, standard, nicest };
  }

  const rows = [
    createData('Hotel', props.hotelPrice.low, props.hotelPrice.median, props.hotelPrice.high),
    createData('Airfare', props.airfarePrice.low, props.airfarePrice.median, props.airfarePrice.high),
    createData('Total', props.totalPrice.low, props.totalPrice.median, props.totalPrice.high),
  ];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Estimated Costs</StyledTableCell>
            <StyledTableCell align="right">Cheapest</StyledTableCell>
            <StyledTableCell align="right">Standard</StyledTableCell>
            <StyledTableCell align="right">Nicest</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">${row.cheapest}</StyledTableCell>
              <StyledTableCell align="right">${row.standard}</StyledTableCell>
              <StyledTableCell align="right">${row.nicest}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}