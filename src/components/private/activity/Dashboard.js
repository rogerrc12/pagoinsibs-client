import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from './tabs/Tabs';
import { Link } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
// Redux
import { connect } from 'react-redux';
import { getAllPayments } from '../../../actions/payments';
import { getAllDebits } from '../../../actions/debits';
import { getBanks } from '../../../actions/banks';

const Dashboard = ({ getAllPayments, getAllDebits, getBanks, payments, debits, skeleton }) => {
  useEffect(() => {
    async function fetchData() {
      const data = [getAllPayments(), getAllDebits(), getBanks()];
      await Promise.all(data);
    }
    fetchData();
  }, [ getAllPayments, getAllDebits, getBanks ]);

  
  const dashboardDetails = () => {
    return skeleton ?
      <>
        <Skeleton animation="wave" variant="rect" width={310} height={158} />
        <Skeleton animation="wave" variant="text" width={310} height={40} />
        <Skeleton animation="wave" variant="text" width={410} />
      </>
    :
      payments.length === 0 && debits.length === 0 ?
      <>
        <div className="dash-main__no-activity">
          <img src={`${process.env.PUBLIC_URL}/img/electronic-pay.svg`} alt="Pago electrónico" />
          <h2>Bienvenido(a) a PAGO INSIBS</h2>
          <p>Envia dinero a otros, automatiza tus pagos y más desde la comodidad de tu teléfono.</p>
        </div>
      </>
      :
      <>
        <h1>Transacciones Realizadas</h1>
        <div className="transactions-container">
          <Tabs payments={payments} debits={debits} />
        </div>
      </>
  }
  
  return (
    <>
      <main className="dash-main main-user__dash">
        <section className="dash-main__activity">
          <img src={process.env.PUBLIC_URL + '/img/main-logo.png'} className="main-user__dash__logo" alt="logo Pago Insibs" />
          {dashboardDetails()}
          <div className="dash-main__profile-link">
            <Link to="/profile" className="dash-main__action">
              <span className="fas fa-user-circle"/> Ver mi perfil
            </Link>
            <Link to="/accounts" className="dash-main__action">
              <span className="fas fa-user-circle"/> Ver mis cuentas
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  payments: PropTypes.array.isRequired,
  debits: PropTypes.array.isRequired,
  getAllPayments: PropTypes.func.isRequired, 
  getAllDebits: PropTypes.func.isRequired, 
  getBanks: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    payments: state.payments.payments,
    debits: state.debits.debits,
    skeleton: state.loading.skeleton
  }
}

export default connect(mapStateToProps, { getAllPayments, getAllDebits, getBanks })(React.memo(Dashboard));
