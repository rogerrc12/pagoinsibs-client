import * as types from "./types";

export const getAccountsInit = () => ({
  type: types.GET_ACCOUNTS_INIT,
});

export const getAccountsSuccess = (accounts) => ({
  type: types.GET_ACCOUNTS_SUCCESS,
  accounts,
});

export const getAccountInfoInit = (id) => ({
  type: types.GET_ACCOUNT_INFO_INIT,
  id,
});

export const getAccountInfoSuccess = (info) => ({
  type: types.GET_ACCOUNT_INFO_SUCCESS,
  info,
});

export const addAccountInit = (values) => ({
  type: types.ADD_ACCOUNT_INIT,
  values,
});

export const addAccountSuccess = () => ({
  type: types.ADD_ACCOUNT_SUCCESS,
});

export const apiError = (msg) => ({
  type: types.API_ERROR,
  msg,
});

// // Add account to profile
export const addAccount = (data) => async (dispatch) => {
  //   dispatch({ type: actionTypes.SET_LOADING });
  //   try {
  //     const config = { headers: { "Content-Type": "application/json" } };
  //     const body = JSON.stringify(data);
  //     const { acc_id } = data;
  //     let res;
  //     if (acc_id !== null) {
  //       res = await axios.put(`/api/accounts/${acc_id}`, body, config);
  //     } else {
  //       res = await axios.post("/api/accounts", body, config);
  //     }
  //     dispatch({ type: actionTypes.REMOVE_LOADING });
  //     dispatch({ type: actionTypes.ACCOUNTS_LOADED, payload: res.data });
  //     dispatch(setAlert(acc_id ? "La cuenta fue actualizada." : "La cuenta fue agregada.", "success"));
  //     setTimeout(() => {
  //       dispatch(closeModal());
  //     }, 500);
  //   } catch (error) {
  //     dispatch({ type: actionTypes.REMOVE_LOADING });
  //     const { message } = error.response.data;
  //     if (message) dispatch(setAlert(message, "error"));
  //     return dispatch({ type: actionTypes.ACCOUNTS_ERROR });
  //   }
};

export const deleteAccount = (id) => (dispatch) => {
  // MySwal.fire({
  //   title: "Deseas eliminiar esta cuenta?",
  //   text: "Los datos se borrarán y no podras revertir esa acción!",
  //   type: "warning",
  //   showCancelButton: true,
  //   confirmButtonColor: "#3085d6",
  //   cancelButtonColor: "#d33",
  //   confirmButtonText: "Si, eiliminar",
  //   cancelButtonText: "Cancelar",
  // }).then(async (result) => {
  //   if (result.value) {
  //     dispatch({ type: actionTypes.SET_LOADING });
  //     try {
  //       const res = await axios.delete(`/api/accounts/${id}`);
  //       dispatch({ type: actionTypes.REMOVE_LOADING });
  //       dispatch({ type: actionTypes.ACCOUNTS_LOADED, payload: res.data });
  //       dispatch(setAlert("Cuenta eliminada correctamente.", "success"));
  //     } catch (error) {
  //       const { message } = error.response.data;
  //       if (message) dispatch(setAlert(message, "error"));
  //       dispatch({ type: actionTypes.ACCOUNTS_ERROR });
  //       dispatch({ type: actionTypes.REMOVE_LOADING });
  //     }
  //   }
  // });
};
