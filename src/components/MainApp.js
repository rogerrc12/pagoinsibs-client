import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import ScrollIntoView from './routing/ScrollIntoView';
import Landing from './layout/landing';
import About from './layout/about';
import Contact from './layout/contact';
import Services from './layout/services';
import PrivacyPolicy from './layout/resources/privacy';
import TermsConditions from './layout/resources/terms';
import Ayuda from './layout/faq';
import Header from './layout/header';
import Footer from './layout/footer';
import Login from './auth/Login';
import Register from './auth/Register';
import Reset from './auth/reset';
import NewPassword from './auth/newPassword';
import NotFound from './layout/NotFound';
import Alert from './layout/Alert';
import Loading from './layout/Loading';
import Chat from './chat/ChatBot';
// Private Routes
  // User 
  import UserHeader from './layout/app/UserHeader';
  import UserNav from './layout/app/UserNav';
  import MobileNav from './layout/app/UserMobileNav';
  import PrivateRoute from './routing/PrivateRoute';
  import Dashboard from './private/activity/Dashboard';
  import PaymentDetail from './private/activity/detail/PaymentDetail';
  import DebitDetail from './private/activity/detail/DebitDetail';
  import Accounts from './private/accounts/Accounts';
  import Profile from './private/profile/Profile';
  import Transfers from './private/transfers';
  import TransferTo from './private/transfers/TransferTo';
  import RequestTransfer from './private/transfers/RequestTransfer';
  import Payments from './private/payments';
  import PayToAccount from './private/payments/Account';
  import PayToCreditCard from './private/payments/CreditCard';
  import DirectDebit from './private/payments/DirectDebit';

// Redux
import { connect } from 'react-redux';
import { removeAlert } from '../actions/alert';
// Helpers
import { addAuthenticatedClass, removeAuthenticatedClass } from '../helpers/helpers';

const MainApp = withRouter(({ auth: { isAuthenticated }, location, alert, removeAlert, loading }) => {
  // close or open alert based on state
  const { pathname } = location;
  const prevPath = useRef();

  // Toggle navbar on mobile
  const [toggleNav, setToggleNav]= useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      addAuthenticatedClass();
    } else {
      removeAuthenticatedClass();
    }

    if(prevPath.current !== pathname) {
      setToggleNav();

      if (alert.open) {
        removeAlert();
      }
    }
    
    prevPath.current = pathname;
  }, [pathname, alert, removeAlert, isAuthenticated]);

  return (
    <ScrollIntoView path="/">
      {loading && <Loading />}
      {
        !isAuthenticated
        ? <Header />
        :
        <>
          <UserHeader toggleNav={toggleNav} setToggleNav={setToggleNav} />
          <UserNav toggleNav={toggleNav} setToggleNav={setToggleNav} />
          <MobileNav />
        </>
      }
        <Switch>
          <Route exact path="/" component={ Landing } />
          <Route exact path="/acerca" component={ About } />
          <Route exact path="/servicios" component={ Services } />
          <Route exact path="/privacy-policy" component={ PrivacyPolicy } />
          <Route exact path="/terms-conditions" component={ TermsConditions } />
          <Route exact path="/contacto" component={ Contact } />
          <Route exact path="/ayuda" component={ Ayuda } />
          <Route exact path="/registro" component={ Register } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/reset" component={ Reset } />
          <Route exact path="/password-reset" component={ NewPassword } />
          <PrivateRoute exact path="/dashboard" component={ Dashboard } />
          <PrivateRoute exact path="/detail/debit/:id" component={ DebitDetail } />
          <PrivateRoute exact path="/detail/:type/:id" component={ PaymentDetail } />
          <PrivateRoute exact path="/profile" component={ Profile } />
          <PrivateRoute exact path="/accounts" component={ Accounts } />
          <PrivateRoute exact path="/transfers" component={ Transfers } />
          <PrivateRoute exact path="/transfers/transfer-to" component={ TransferTo } />
          <PrivateRoute exact path="/transfers/request-transfer" component={ RequestTransfer } />
          <PrivateRoute exact path="/payments" component={ Payments } />
          <PrivateRoute exact path="/payments/account" component={ PayToAccount } />
          <PrivateRoute exact path="/payments/credit-card" component={ PayToCreditCard } />
          <PrivateRoute exact path="/payments/direct-debit" component={ DirectDebit } />
          
          <Route path="*" component={ NotFound } /> 
        </Switch>
      {!isAuthenticated && <Footer />}
      {isAuthenticated && <Chat />}
      <Alert />
    </ScrollIntoView>
  )
})

MainApp.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    alert: state.alert,
    loading: state.loading.loading
  }
}

export default connect(mapStateToProps, { removeAlert })(MainApp);
