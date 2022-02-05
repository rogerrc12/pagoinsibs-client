import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "../layout/Modal";
import ProfileForm from "../private/ProfileForm";
import { Route, Redirect } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { showModal } from "../../store/actions";

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, user }, showModal, ...rest }) => {
  useEffect(() => {
    if (!user.profileCompleted && isAuthenticated) showModal();
  }, [user, isAuthenticated, showModal]);

  return !user.profileCompleted && isAuthenticated ? (
    <Modal preventClose>
      <ProfileForm />
    </Modal>
  ) : (
    <Route {...rest} render={(props) => (!isAuthenticated ? <Redirect to={{ pathname: "/login", state: { from: props.location } }} /> : <Component {...props} />)} />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.Auth,
  };
};

export default connect(mapStateToProps, { showModal })(PrivateRoute);
