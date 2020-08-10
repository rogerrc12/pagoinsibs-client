import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>404</h1>
        </div>
        <h2>Oops! Página no encontrada</h2>
        <p>La página que buscas no existe o fue eliminada. <Link to="/">Regresar al inicio</Link></p>
        <div className="notfound-social">
          <a href="#!"><i className="fab fa-facebook"></i></a>
          <a href="#!"><i className="fab fa-twitter"></i></a>
          <a href="#!"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </div>
  )
}

export default NotFound;
