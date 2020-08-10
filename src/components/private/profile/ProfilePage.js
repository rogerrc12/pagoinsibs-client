import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import { showModal } from '../../../actions/modal';

const ProfilePage = ({ user, showModal }) => {

  // Handle menu pagos
  const [open, setOpen] = useState(null);

  const openMenu = e => {
    setOpen(e.currentTarget);
  }

  const closeMenu = () => {
    setOpen(null);
  }

  // format Date
  const userBirthday = user.birthday ? `${new Date(user.birthday).getDate()}/${new Date(user.birthday).getMonth() + 1}/${new Date(user.birthday).getFullYear()}` : '';

  return (
    <main className="main-user__dash main-user-profile">

      <img src={`${process.env.PUBLIC_URL}/img/main-logo.png`} className="main-user__dash__logo" alt="logo Pago Insibs" />
      <h1 className="main-profile__title">Datos de perfil</h1>
      <p className="main-profile__subtitle">Actualiza tus datos y agrega cuentas para tus pagos</p>

      <div className="main-profile">
        <section className="main-profile__info">

          <div className="container">
            <div className="row">

              <div className="col-md-6">
                <div className="form-group">
                  <label>Nombre Completo</label>
                  <input 
                    type="text" 
                    disabled 
                    aria-label="nombre" 
                    placeholder={`${user.firstName} ${user.lastName}`}
                    style={{ cursor: 'initial' }}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div 
                  className="form-group icon-group" 
                  onClick={e => {
                    if (e.target.classList.contains('profile-input')) {
                      showModal()
                    }
                  }}
                >
                  <label>Direccion</label>
                  <input 
                    className="profile-input"
                    type="text"
                    placeholder={user.address ? `${(user.address).substring(0, 17) + '...'} - ${user.city}` : ''}
                    disabled
                  />
                  <span className="fas fa-map-marker-alt input-icon"/>
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>Usuario de pago</label>
                  <input 
                    type="text" 
                    disabled 
                    aria-label="username" 
                    placeholder={user.username}
                    style={{ cursor: 'initial' }}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div 
                  className="form-group icon-group" 
                  onClick={e => {
                    if (e.target.classList.contains('profile-input')) {
                      showModal()
                    }
                  }}
                >
                  <label htmlFor="birthday">Fecha de Nacimiento</label>
                  <input 
                    className="profile-input"
                    type="text" 
                    id="birthday" 
                    disabled 
                    placeholder={userBirthday} 
                  />
                  <span className="fas fa-calendar-alt input-icon"/>
                </div>
              </div>

            </div>
          </div>

          <div 
            className="form-group form-group__email icon-group" 
            onClick={e => {
              if (e.target.classList.contains('profile-input')) {
                showModal()
              }
            }}
          >
            <label htmlFor="email">Correo Electrónico</label>
            <input 
              className="profile-input"
              type="text" 
              id="email" 
              disabled 
              placeholder={user.email} 
            />
            <span className="fas fa-envelope input-icon"/>
          </div>

          <div 
            className="form-group__phone form-group icon-group" 
            onClick={e => {
              if (e.target.classList.contains('profile-input')) {
                showModal()
              }
            }}
          >
            <input 
              className="profile-input"
              type="text" 
              disabled 
              aria-label="telefono"
              placeholder={user.phone ? user.phone : 'telefono'}
            />
            <span className="fas fa-phone input-icon"/>
          </div>

        </section>

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

    </main>
  )
}

ProfilePage.propTypes = {
  user: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, { showModal })(ProfilePage);
