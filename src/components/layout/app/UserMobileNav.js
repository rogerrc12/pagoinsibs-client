import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import useScrollPosition from '../../../hooks/scrollPosition';

const UserMobileNav = () => {

  const heightRef = useRef();
  useEffect(() => {
    heightRef.current = document.querySelector('.user-header').offsetHeight;
  });


  // CHECK HEADER HEIGHT AND SHOW USER NAV ON THAT
  const scrollPosition = useScrollPosition();

  return (
    <nav className={`user-mobile-nav ${scrollPosition > heightRef.current ? 'show' : 'hide'}`}>
      <ul className="user-mobile-nav__list">
        <li className="user-mobile-nav__item">
          <NavLink to="/dashboard" activeClassName="active">
            <span className="far fa-clock" /> <span className="user-mobile-nav__text">Actividad</span>
          </NavLink>
        </li>
        <li className="user-mobile-nav__item">
          <NavLink to="/payments" activeClassName="active">
            <span className="far fa-money-bill-alt"/> <span className="user-mobile-nav__text">Pagos</span>
          </NavLink>
        </li>
        <li className="user-mobile-nav__item">
          <NavLink to="/accounts" activeClassName="active">
            <span className="fas fa-university"/> <span className="user-mobile-nav__text">Cuentas</span>
          </NavLink>
        </li>
        <li className="user-mobile-nav__item">
          <NavLink to="/profile" activeClassName="active">
            <span className="far fa-user-circle"/> <span className="user-mobile-nav__text">Perfil</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default UserMobileNav;
