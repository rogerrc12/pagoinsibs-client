import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// Helper
import { toggleMobile, closeMobileNav } from '../../../helpers/helpers';


const Header = withRouter(({ history }) => {
  const { pathname } = history.location;

  // refs
  const mobileNav = React.createRef();
  const toggleBtn = React.createRef();
  const header = React.createRef();

  return (
    <>
      <header className="main-header" ref={header}>

        <div className="main-logo">
          <Link to="/">
            <img src={process.env.PUBLIC_URL + '/img/main-logo.png'} alt="Pago Insibs logo" />
          </Link>
        </div>

        <nav className="main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link to="/acerca">Acerca de</Link>
            </li>

            <li className="main-nav__item">
              <Link to="/servicios">Servicios</Link>
            </li>

            <li className="main-nav__item">
              <Link to="/">Para Comercios</Link>
            </li>
            

            <li className="main-nav__item">
              {pathname.includes('login')
                ? <Link to="/registro" className="button">Registrarse</Link>
                : <Link to="/login" className="button">Iniciar sesión</Link>
              }
            </li>

          </ul>
        </nav>

        <div className="main-nav__mobile">
          {pathname.includes('login')
            ? <Link to="/registro" className="button">Registrarse</Link>
            : <Link to="/login" className="button">Acceder</Link>
          }
          <div className="toggle-btn" 
            onClick={e => toggleMobile(e, mobileNav.current, header.current)} ref={toggleBtn}
          >
            <span className="toggle-btn__bar"></span>
            <span className="toggle-btn__bar"></span>
            <span className="toggle-btn__bar"></span>
          </div>
        </div>

      </header>

      <nav className="mobile-nav" ref={mobileNav} 
        onClick={e => closeMobileNav(e, toggleBtn.current)}
      >
        <ul className="mobile-nav__list">
          <li className="mobile-nav__item">
            <Link to="/acerca" className="mobile-nav__link">Acerca de</Link>
          </li>
          <li className="mobile-nav__item">
            <Link to="/servicios" className="mobile-nav__link">Servicios</Link>
          </li>
          <li className="mobile-nav__item">
            <Link to="/comercios" className="mobile-nav__link">Para Comercios</Link>
          </li>
          <li className="mobile-nav__item">
            <Link to="/login" className="mobile-nav__btn mobile-nav__link">Iniciar sesión</Link>
          </li>
        </ul>
      </nav>
    </>
  )
});


export default Header;
