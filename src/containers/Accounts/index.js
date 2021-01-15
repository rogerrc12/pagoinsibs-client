import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "../../components/layout/Modal";
import AccountForm from "../../components/private/AccountForm";
import { Link } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
// REDUX
import { connect } from "react-redux";
import { showModal, getAccountsInit, deleteAccount } from "../../store/actions";

const Accounts = ({ accounts, skeleton, showModal, deleteAccount, getAccountsInit }) => {
  const [accData, setAccData] = useState(null);

  // call accounts
  useEffect(() => {
    getAccountsInit();
  }, [getAccountsInit]);

  // show form to send account
  const setModal = (data = null) => {
    setAccData(data);
    showModal();
  };

  const toSend = accounts.filter((account) => account.toSend);

  return (
    <section className='main-user__dash accounts-section'>
      <div className='container'>
        <h3 className='account-title'>Cuentas para pagar</h3>
        <div className='row'>
          {toSend.length > 0 ? (
            <>
              {toSend.map((account) => (
                <div className='col-12 mb-3' key={account.id}>
                  <div className='account-container'>
                    <div className='account-information'>
                      {skeleton ? (
                        <>
                          <Skeleton variant='circle' width={60} height={60} animation='wave' />
                          <Skeleton variant='text' width={100} animation='wave' />
                        </>
                      ) : (
                        <>
                          <img src={`${process.env.PUBLIC_URL}/img/bancos/${account.bank.bankImg}`} alt={account.bank.bankName} />
                          <p>
                            <span className='account-number'>{"termina en " + account.accNumber.substring(15, 20)}</span>
                            <br />
                            <span className='account-type'>{account.accType}</span>
                          </p>
                        </>
                      )}
                    </div>
                    <div className='account-buttons'>
                      <button className='account-action' onClick={setModal.bind(null, account)}>
                        editar
                      </button>
                      <button className='account-action account-delete' onClick={() => deleteAccount(account.id)}>
                        eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {toSend.length < 4 ? (
                <div className='account-action-container'>
                  <button className='button transaction-btn' onClick={() => setModal()}>
                    Agregar cuenta
                  </button>
                </div>
              ) : null}
            </>
          ) : (
            <>
              <div className='col-12 mb-3'>
                <div className='account-container no-account'>
                  <div className='account-information'>
                    <p>No tienes cuentas agregadas</p>
                  </div>
                  <span className='far fa-sad-tear' />
                </div>
              </div>
              <div className='account-action-container'>
                <button className='button transaction-btn' onClick={() => setModal()}>
                  Agregar cuenta
                </button>
              </div>
            </>
          )}
        </div>

        <div className='dash-main-action__container'>
          <Link to='/payments' className='transaction-btn button'>
            Pago único
          </Link>

          <Link to='/debits' className='transaction-btn button'>
            Pago en cuotas
          </Link>
        </div>
      </div>
      <Modal>
        <AccountForm accData={accData} />
      </Modal>
    </section>
  );
};

Accounts.propTypes = {
  accounts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    accounts: state.Accounts.accounts,
  };
};

export default connect(mapStateToProps, { showModal, deleteAccount, getAccountsInit })(React.memo(Accounts));
