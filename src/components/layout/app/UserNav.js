import React, { Fragment, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { logout } from "../../../store/actions/auth";

const UserNav = ({ toggleNav, setToggleNav }) => {
  // ref of navbar, overlay and close
  const navbarRef = useRef();
  const overlayRef = useRef();
  const closeRef = useRef();

  // open/close navbar mobile
  useEffect(() => {
    const handleNav = () => {
      if (toggleNav && navbarRef.current) {
        navbarRef.current.classList.remove("closed");
        overlayRef.current.style.display = "block";
        closeRef.current.style.display = "block";
        setTimeout(() => {
          overlayRef.current.classList.add("open");
          navbarRef.current.classList.add("open");
          closeRef.current.classList.add("open");
        }, 100);
      } else {
        overlayRef.current.classList.remove("open");
        navbarRef.current.classList.remove("open");
        closeRef.current.classList.remove("open");

        setTimeout(() => {
          navbarRef.current.classList.add("closed");
          overlayRef.current.style.display = "none";
          closeRef.current.style.display = "none";
        }, 700);
      }
    };

    handleNav();
  }, [toggleNav]);

  const closeNav = () => setToggleNav(false);

  return (
    <Fragment>
      <nav className='user-nav' ref={navbarRef}>
        <div className='user-nav__info'>
          <Link to='/dashboard'>
            <img src={process.env.PUBLIC_URL + "/img/main-logo.png"} alt='logo Pago Insibs' />
          </Link>
        </div>

        <ul className='user-nav__list'>
          <li className='user-nav__item'>
            <NavLink exact to='/dashboard' activeClassName='active'>
              <span className='far fa-clock icon'></span> Actividad
            </NavLink>
          </li>

          {/* <li className="user-nav__item">
              <NavLink exact to="/transfers" activeClassName="active">
                  <span className="fas fa-exchange-alt"></span> Transferencias
              </NavLink>
            </li> */}

          <li className='user-nav__item'>
            <NavLink to='/payments' activeClassName='active'>
              <span className='fas fa-credit-card'></span> Pagos
            </NavLink>
          </li>

          <li className='user-nav__item'>
            <NavLink to='/debits' activeClassName='active'>
              <span className='fas fa-university icon'></span> Domiciliaciones
            </NavLink>
          </li>

          <li className='user-nav__item'>
            <NavLink to='/accounts' activeClassName='active'>
              <span className='fas fa-wallet icon'></span> Mis cuentas
            </NavLink>
          </li>

          <li className='user-nav__item'>
            <NavLink to='/profile' activeClassName='active'>
              <span className='far fa-user-circle icon'></span> Mi perfil
            </NavLink>
          </li>
        </ul>

        <div className='user-nav__footer'>
          <p>
            &copy; Pago INSIBS 2019 <br /> <span>Todos los derechos reservados.</span>
          </p>
        </div>
      </nav>

      <span className='user-nav__close fas fa-times' ref={closeRef} onClick={closeNav}></span>

      <div className='overlay' ref={overlayRef} onClick={closeNav}></div>
    </Fragment>
  );
};

UserNav.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(UserNav);
