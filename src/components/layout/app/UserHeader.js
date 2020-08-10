import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
// REDUX
import { connect } from 'react-redux';
import { logout } from '../../../actions/auth';

export const UserHeader = withRouter(({
// eslint-disable-next-line no-shadow
  user, logout, toggleNav, setToggleNav, location,
}) => {
  const { pathname } = location;

  const headerTitle = () => {
    let title;
    switch (pathname) {
      case '/dashboard':
        title = 'Actividad';
        break;
      case '/profile':
        title = 'Mi perfil';
        break;
      case '/accounts':
        title = 'Mis cuentas';
        break;
      case '/transfers':
        title = 'Transferencias';
        break;
      case '/transfers/transfer-to':
        title = 'Envío a terceros';
        break;
      case '/transfers/request-transfer':
        title = 'Solicitud de dinero';
        break;
      case '/payments':
        title = 'Realizar pagos';
        break;
      case '/payments/account':
        title = 'Pago con cuenta';
        break;
      case '/payments/credit-card':
        title = 'Pago con tarjeta';
        break;
      case '/payments/direct-debit':
        title = 'Pagos automáticos';
        break;
      default:
        title = '';
    }

    if (pathname.includes('detail')) title = 'Detalle de transacción';

    return title;
  };

  const toggleProfile = (e) => {
    if (e.currentTarget.classList.contains('open')) {
      e.currentTarget.classList.remove('open');
    } else {
      e.currentTarget.classList.add('open');
    }
  };


  return (
    <header className="user-header">
      <div
        className={`user-header__toggle ${toggleNav ? 'open' : ''}`}
        onClick={() => setToggleNav(true)}
      >
        <span className="user-header__burger" />
      </div>

      <h2 className="user-header__title">
        {headerTitle()}
      </h2>

      <nav className="user-header__nav" onClick={toggleProfile}>

        <div className="user-header__profile">
          <span className="fas fa-user" />
          <span className="fas fa-sort-down" />
        </div>
        {/* Header profile icon button */}

        <div className="user-header__nested">

          <div className="user-header__info">
            <div className="user-header__profile">
              <span className="fas fa-user" />
            </div>
            <div className="user-header__content">
              <span>{`${user.firstName} ${user.lastName}`}</span>
              <br />
              <span className="user-info__pay-id">{user.username}</span>
              <br />
              <span className="user-info__client-id">
                ID cliente
                {user.clientId}
              </span>
            </div>
          </div>
          {/* Information of the user */}

          <ul className="user-header__list">
            <li className="user-header__item">
              <Link to="/profile">
                <span className="fas fa-user" />
                {' '}
                Ver mi perfil
              </Link>
            </li>
            <li className="user-header__item" onClick={logout}>
              <span>
                <span className="fas fa-sign-out-alt" />
                {' '}
                Cerrar sesión
              </span>
            </li>
          </ul>
          {/* Header navigation */}

        </div>
      </nav>
    </header>
  );
});

UserHeader.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(UserHeader);
