import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import { setCurrency } from "../../../../helpers/helpers";
// MATERIAL TABLE
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import TablePaginationActions from "../../../../helpers/Pagination";

const PaymentsTable = ({ payments }) => {
  const sortedPayments = payments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, sortedPayments.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper style={{ overflowX: "auto" }}>
      <Table className='user-table' aria-label='Pagos únicos realizados'>
        <TableHead>
          <TableRow>
            <TableCell className='table-head'>Empresa</TableCell>
            <TableCell className='table-head'>Monto</TableCell>
            <TableCell className='table-head'>Fecha</TableCell>
            <TableCell className='table-head' align='right'>
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0 ? sortedPayments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : sortedPayments).map((payment) =>
            payment.status ? (
              <TableRow key={payment.createdAt} className='table-row'>
                <TableCell component='th' scope='row'>
                  <Link to={`payment-details/${payment.id}`}>{payment.supplier.name.substring(0, 30) + "..."}</Link>
                </TableCell>
                <TableCell>{setCurrency(payment.amount) + " " + payment.currency.symbol}</TableCell>
                <TableCell>{moment(payment.createdAt).format("DD/MM/YYYY hh:mm a")}</TableCell>
                <TableCell align='right'>
                  <span className={`status ${payment.status.name}`}>{payment.status.name}</span>
                </TableCell>
              </TableRow>
            ) : null
          )}

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
              count={payments.length}
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

PaymentsTable.propTypes = {
  payments: PropTypes.array.isRequired,
};

export default React.memo(PaymentsTable);
