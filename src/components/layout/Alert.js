import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import { Error, CheckCircle, Close } from '@material-ui/icons';
import Snackbar from '@material-ui/core/Snackbar';
// REDUX
import { connect } from 'react-redux';
import { removeAlert } from '../../actions/alert';

const Alert = ({ removeAlert, alert }) => {
  const Icon = alert.iconType === 'error' ? Error : CheckCircle;

  return (
    <Snackbar
      className={`snackbar-${alert.iconType}`}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={alert.open}
      autoHideDuration={9000}
      onClose={removeAlert}
      message={
        <span id="admin-snackbar" style={{ display: 'flex', alignItems: 'center' }}>
          <Icon />
          <span style={{ marginLeft: '7px', fontSize: '.9rem' }}>{alert.message}</span>
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={removeAlert}>
          <Close />
        </IconButton>
      ]}
    />
  )
}

Alert.propTypes = {
  removeAlert: PropTypes.func.isRequired,
  alert: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    alert: state.alert
  }
}

export default connect(mapStateToProps, { removeAlert })(Alert);

