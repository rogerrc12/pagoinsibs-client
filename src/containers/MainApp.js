import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Switch, Route, withRouter } from "react-router-dom";
import ScrollIntoView from "../components/routing/ScrollIntoView";
import Landing from "../components/layout/landing";
import About from "../components/layout/about";
import Contact from "../components/layout/contact";
import Services from "../components/layout/services";
import PrivacyPolicy from "../components/layout/resources/privacy";
import TermsConditions from "../components/layout/resources/terms";
import Ayuda from "../components/layout/faq";
import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Reset from "../components/auth/reset";
import NewPassword from "../components/auth/newPassword";
import NotFound from "../components/layout/NotFound";
import Alert from "../components/layout/Alert";
// import Loading from "../components/layout/Loading";
import Chat from "../components/chat/ChatBot";
// Private Routes
// User
import UserHeader from "../components/layout/app/UserHeader";
import UserNav from "../components/layout/app/UserNav";
import MobileNav from "../components/layout/app/UserMobileNav";
import PrivateRoute from "../components/routing/PrivateRoute";
import Dashboard from "../containers/Dashboard";
import PaymentDetails from "../containers/Payments/PaymentDetails";
import DebitDetails from "../containers/DirectDebits/DebitDetails";
import Accounts from "../containers/Accounts";
import Profile from "../containers/Profile";
// import Transfers from "../components/private/transfers";
// import TransferTo from "../components/private/transfers/TransferTo";
// import RequestTransfer from "../components/private/transfers/RequestTransfer";
import Payments from "./Payments/Payments";
import Debits from "./DirectDebits/DirectDebits";

// Redux
import { connect } from "react-redux";
import * as actions from "../store/actions";
// Helpers
import { addAuthenticatedClass, removeAuthenticatedClass } from "../helpers/helpers";

const MainApp = (props) => {
  // close or open alert based on state
  const { alert, getCurrencies, getBanks, removeAlert } = props;
  const { pathname } = props.location;
  const { isAuthenticated } = props.auth;
  const prevPath = useRef();

  // Toggle navbar on mobile
  const [toggleNav, setToggleNav] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      getCurrencies();
      getBanks();
    }
  }, [isAuthenticated, getCurrencies, getBanks]);

  useEffect(() => {
    if (isAuthenticated) {
      addAuthenticatedClass();
    } else {
      removeAuthenticatedClass();
    }

    if (prevPath.current !== pathname) {
      setToggleNav();
      if (alert.open) removeAlert();
    }

    prevPath.current = pathname;
  }, [pathname, alert, removeAlert, isAuthenticated]);

  return (
    <ScrollIntoView path='/'>
      {!isAuthenticated ? (
        <Header />
      ) : (
        <>
          <UserHeader toggleNav={toggleNav} setToggleNav={setToggleNav} />
          <UserNav toggleNav={toggleNav} setToggleNav={setToggleNav} />
          <MobileNav />
        </>
      )}

      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/acerca' component={About} />
        <Route exact path='/servicios' component={Services} />
        <Route exact path='/privacy-policy' component={PrivacyPolicy} />
        <Route exact path='/terms-conditions' component={TermsConditions} />
        <Route exact path='/contacto' component={Contact} />
        <Route exact path='/ayuda' component={Ayuda} />
        <Route exact path='/registro' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/reset' component={Reset} />
        <Route exact path='/password-reset' component={NewPassword} />

        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/debit-details/:id' component={DebitDetails} />
        <PrivateRoute exact path='/payment-details/:id' component={PaymentDetails} />
        <PrivateRoute exact path='/profile' component={Profile} />
        <PrivateRoute exact path='/accounts' component={Accounts} />
        {/* <PrivateRoute exact path='/transfers' component={Transfers} />
        <PrivateRoute exact path='/transfers/transfer-to' component={TransferTo} /> */}
        {/* <PrivateRoute exact path='/transfers/request-transfer' component={RequestTransfer} /> */}
        <PrivateRoute path='/payments' component={Payments} />
        <PrivateRoute path='/debits' component={Debits} />

        <Route path='*' component={NotFound} />
      </Switch>
      {!isAuthenticated && <Footer />}
      {isAuthenticated && <Chat />}
      <Alert />
    </ScrollIntoView>
  );
};

MainApp.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.Auth,
    alert: state.Alert,
  };
};

const mapDistpachToProps = (dispatch) => ({
  removeAlert: () => dispatch(actions.removeAlert()),
  getCurrencies: () => dispatch(actions.getCurrenciesInit()),
  getBanks: () => dispatch(actions.getBanksInit()),
});

export default connect(mapStateToProps, mapDistpachToProps)(withRouter(MainApp));
