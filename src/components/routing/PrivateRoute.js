import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Modal from "../layout/Modal";
import ProfileForm from "../private/profile/forms/ProfileForm";
import { Route, Redirect } from "react-router-dom";
// Redux
import { connect } from "react-redux";
import { showModal } from "../../actions/modal";

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, user }, showModal, ...rest }) => {
  useEffect(() => {
    if (!user.profileCompleted && isAuthenticated) {
      showModal();
    }
  });

  return !user.profileCompleted && isAuthenticated ? (
    <Modal>
      <ProfileForm />
    </Modal>
  ) : (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { showModal })(PrivateRoute);
