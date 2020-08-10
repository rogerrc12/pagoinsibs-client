import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { setCurrency } from '../../../../helpers/helpers';
//MATERIAL TABLE
import { useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

 //FUNCTION FOR TABLE PAGINATION
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// FUNCTION FOR TABLE
const TransfersTable = ({ transfers }) => {

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, transfers.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  return (
  <Paper style={{ overflowX: 'auto' }}>
    <Table className="user-table" aria-label="transferencias a terceros">
      <TableHead>
        <TableRow>
          <TableCell className="table-head">Enviado a</TableCell>
          <TableCell className="table-head">Monto</TableCell>
          <TableCell className="table-head">Fecha</TableCell>
          <TableCell className="table-head" align="right">Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {(rowsPerPage > 0
          ? transfers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : transfers
        ).map(transfer => (
          <TableRow key={transfer.id} className="table-row">
            <TableCell component="th" scope="row">
              <Link to={`detail/transfer/${transfer.id}`}>{transfer.first_name + ' ' + transfer.last_name}</Link>
            </TableCell>
            <TableCell>{setCurrency(transfer.amount) + ' Bs.'}</TableCell>
            <TableCell>
              <Moment format="DD/MM/YYYY">{transfer.date_issued}</Moment>
            </TableCell>
            <TableCell align="right" className="status">
            <span className={transfer.status_id === 1 ? 'pendiente' : transfer.status_id === 2 ? 'procesando' : transfer.status_id === 3 ? 'exitoso' : 'fallido'}>
              {transfer.status_id === 1 ? 'pendiente' : transfer.status_id === 2 ? 'en proceso' : 'finalizada'}
            </span>
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
            count={transfers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: { 'aria-label': 'entradas por página' },
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
  )
}

export default TransfersTable;
