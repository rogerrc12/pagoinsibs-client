import axios from '../../helpers/axios';
import * as actionTypes from '../constants';
import { setAlert } from './alert';
import { logout } from './auth';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

export const sendTransferDetails = (data) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });

  const config = { headers: { 'Content-Type': 'application/json' } };
  const body = JSON.stringify(data);

  try {
    const res = await axios.post('/api/detail/transfer', body, config);

    dispatch({ type: actionTypes.SEND_DETAIL_SUCCESS });
    dispatch({ type: actionTypes.REMOVE_LOADING });

    return res.data;
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      if (errors[0].msg.toLowerCase().includes('token')) {
        return dispatch(logout());
      } else {
        dispatch(setAlert(errors[0].msg, 'error'));
      }
    }

    dispatch({ type: actionTypes.REMOVE_LOADING });
    dispatch({ type: actionTypes.SEND_DETAIL_FAIL });
  }
};

export const sendPaymentDetails = (type, id) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });

  try {
    const res = await axios.post(`/api/detail/payment/${type}/${id}`);

    dispatch({ type: actionTypes.SEND_DETAIL_SUCCESS });
    dispatch({ type: actionTypes.REMOVE_LOADING });

    MySwal.fire({
      type: 'success',
      title: 'Enviado',
      confirmButtonColor: '#37ce7b',
      text: `El detalle del pago fue enviado correctamente a ${res.data.email}`,
    });

    return true;
  } catch (error) {
    const message = error.response.data.message;
    if (message) dispatch(setAlert(message, 'error'));

    dispatch({ type: actionTypes.SEND_DETAIL_FAIL });
    dispatch({ type: actionTypes.REMOVE_LOADING });
    return false;
  }
};

export const sendDebitDetails = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.SET_LOADING });

  try {
    const res = await axios.post(`/api/detail/debit/${id}`);

    dispatch({ type: actionTypes.SEND_DETAIL_SUCCESS });
    dispatch({ type: actionTypes.REMOVE_LOADING });

    MySwal.fire({
      type: 'success',
      title: 'Enviado',
      confirmButtonColor: '#37ce7b',
      text: `El detalle de la domiciliación fue enviada correctamente a ${res.data.email}`,
    });

    return true;
  } catch (error) {
    const message = error.response.data.message;

    if (message) dispatch(setAlert(message, 'error'));

    dispatch({ type: actionTypes.SEND_DETAIL_FAIL });
    dispatch({ type: actionTypes.REMOVE_LOADING });
    return false;
  }
};
