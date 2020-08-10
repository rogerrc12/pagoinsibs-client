import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import Modal from '../layout/Modal';
import ProfileForm from '../private/profile/forms/ProfileForm';
import { Route, Redirect } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import { showModal } from '../../actions/modal';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading, user }, showModal, ...rest }) => {
  useEffect(() => {
    if (user.profileCompleted === false) {
      showModal();
    }
  });

  return user.profileCompleted === false
  ?
  <Modal>
    <ProfileForm />
  </Modal>
  :
  <Route {...rest} render={props => (
    !isAuthenticated && !loading
    ?
      <Redirect to="/login" />
    :
      <Component {...props} />
  )}
  
  />
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { showModal })(PrivateRoute);
