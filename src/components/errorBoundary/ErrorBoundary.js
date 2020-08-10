import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ErrorIcon from '../../assets/icons/error.svg';


class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: { message: '', stack: '' },
    info: { componentStack: '' },
  };

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError = (error) => ({ hasError: true });

  componentDidCatch = (error, info) => {
    this.setState({ error, info });
  };

  render() {
    const { hasError, error, info } = this.state;
    // eslint-disable-next-line react/prop-types
    const { children } = this.props;
    console.log(error, info);

    return hasError ? <ErrorComponent /> : children;
  }
}

const ErrorComponent = () => (
  <main className="error-main">
    <section className="error-section">
      <img src={ErrorIcon} alt="Error icon" />
      {/* eslint-disable-next-line max-len */}
      <p>Ups! Lo sentimos pero ha ocurrido un error inesperado. Haremos lo posible por solucionarlo.</p>
      <Link to="/dashboard">
        <i className="fas fa-arrow-left" />
        {' '}
        Volver a actividades
      </Link>
    </section>
  </main>
);

export default withRouter(ErrorBoundary);
