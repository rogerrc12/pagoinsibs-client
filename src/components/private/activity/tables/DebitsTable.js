import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { setCurrency } from "../../../../helpers/helpers";
// MATERIAL
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "../../../../helpers/Pagination";

const DebitsTable = ({ debits }) => {
  const sortedDebits = debits.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, sortedDebits.length - page * rowsPerPage);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper style={{ overflowX: "auto" }}>
      <Table className='user-table' aria-label='Pagos automáticos realizados'>
        <TableHead>
          <TableRow>
            <TableCell className='table-head'>Producto</TableCell>
            <TableCell className='table-head'>Monto cuota</TableCell>
            <TableCell className='table-head'>Fecha</TableCell>
            <TableCell className='table-head' align='right'>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0 ? sortedDebits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : sortedDebits).map((debit) => (
            <TableRow key={debit.createdAt} className='table-row'>
              <TableCell component='th' scope='row'>
                <Link to={`/debit-details/${debit.id}`}>{debit.product.name.substring(0, 30) + "..."}</Link>
              </TableCell>
              <TableCell>{setCurrency(debit.amount) + " " + debit.currency.symbol}</TableCell>
              <TableCell>
                <Moment format='DD/MM/YYYY'>{debit.createdAt}</Moment>
              </TableCell>
              <TableCell align='right'>
                <span className={`status ${debit.status.name}`}>{debit.status.name}</span>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5]}
              colSpan={3}
              count={debits.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "entradas por página" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  );
};

DebitsTable.propTypes = {
  debits: PropTypes.array.isRequired,
};

export default React.memo(DebitsTable);
