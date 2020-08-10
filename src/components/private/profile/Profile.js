import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../layout/Modal';
import ProfileForm from './forms/ProfileForm';
// Redux
import { connect } from 'react-redux';
import ProfilePage from './ProfilePage';
import Loading from '../../layout/Loading';

const Profile = ({ activity: { loading } }) => {

  return (
    <Fragment>
      { loading && <Loading /> }
      <ProfilePage />
      <Modal>
        <ProfileForm />
      </Modal>
    </Fragment>
  )
}

Profile.propTypes = {
  activity: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    activity: state.activity
  }
}

export default connect(mapStateToProps)(Profile);
