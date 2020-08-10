import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../layout/Modal';
import ToSend from './forms/ToSend';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
// REDUX
import { connect } from 'react-redux';
import { showModal } from '../../../actions/modal';
import { getAccounts, deleteAccount } from '../../../actions/accounts';

const Accounts = ({ accounts, skeleton, showModal, deleteAccount, getAccounts }) => {
  // call accounts
  useEffect(() => {
    getAccounts();
  }, [getAccounts])

  // set acc data to edit
  const accData = useRef(null);

  // show form to send account
  const setModal = (data = null) => {
    accData.current = data;
    showModal();
  }

  // Handle menu pagos
  const [open, setOpen] = useState(null);
  const openMenu = e => {
    setOpen(e.currentTarget);
  }
  const closeMenu = () => {
    setOpen(null);
  }
  
  const toSend = accounts.filter(account => account.toSend);

  return (
    <section className="main-user__dash accounts-section">
      <div className="container">
        <h3 className="account-title">Cuentas para pagar</h3>
        <div className="row">
          {toSend.length > 0 ?
            <>
              {              
                toSend.map(account => (
                  <div className="col-12 mb-3" key={account.id}>
                    <div className="account-container">
                      <div className="account-information">
                      {
                        skeleton
                        ?
                          <>
                            <Skeleton variant="circle" width={60} height={60} animation="wave" />
                            <Skeleton variant="text" width={100} animation="wave" />
                          </>
                        :
                        <>
                          <img src={`${process.env.PUBLIC_URL}/img/bancos/${account.bank.bankImg}`}  alt={account.bank.bankName} />
                          <p>
                            <span className="account-number">{'termina en ' +  (account.accNumber).substring(15, 20)}</span>
                            <br/>
                            <span className="account-type">{account.accType}</span>
                          </p>
                        </>
                      }
                      </div>
                      <div className="account-buttons">
                        <button className="account-action" onClick={() => { setModal(account) }} >
                          editar
                        </button>
                        <button className="account-action account-delete" 
                          onClick={() => { deleteAccount(account.id) }}
                        >
                          eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              }
              {
                toSend.length < 4 ?
                <div className="account-action-container">
                  <button className="button transaction-btn" onClick={() => setModal()}>Agregar cuenta</button>
                </div> : null
              }
            </>
            :
            <>
              <div className="col-12 mb-3">
                <div className="account-container no-account">
                  <div className="account-information">
                    <p>No tienes cuentas agregadas</p>
                  </div>
                  <span className="far fa-sad-tear"/>
                </div>
              </div>
              <div className="account-action-container">
                <button className="button transaction-btn" onClick={() => setModal()}>Agregar cuenta</button>
              </div>
            </>
          }
        </div>
        
        <div className="dash-main-action__container">
          <span 
            className="transaction-btn button"
            aria-controls="menu-pagos"
            aria-haspopup="true"
            onClick={openMenu}
          >
            Pago único
          </span>
          <Menu
            id="menu-pagos"
            anchorEl={open}
            keepMounted
            open={Boolean(open)}
            onClose={closeMenu}
            >
            <Link to="/payments/credit-card" onClick={closeMenu}> <span className="fas fa-credit-card"/> pago con TDC</Link>
            <Link to="/payments/account" onClick={closeMenu}><span className="fas fa-money-check-alt"/> pago con cuenta</Link>
          </Menu>

          <Link to="/payments/direct-debit" className="transaction-btn button">
            Pago en cuotas
          </Link>
        </div>
      </div>
      <Modal>
        <ToSend accData={accData} />
      </Modal>
    </section>
  )
}

Accounts.propTypes = {
  accounts: PropTypes.array.isRequired,
  showModal: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired, 
  getAccounts: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts.accounts,
    skeleton: state.loading.skeleton
  }
}

export default connect(mapStateToProps, { showModal, deleteAccount, getAccounts })(React.memo(Accounts));