import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ModalContent from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
// Redux
import { connect } from "react-redux";
import { closeModal } from "../../store/actions";

const Modal = ({ show, children, closeModal, type }) => {
  useEffect(() => {
    const bodyEL = document.querySelector("body");

    if (show) {
      bodyEL.classList.add("stop-scroll");
    } else {
      bodyEL.classList.remove("stop-scroll");
    }
  });

  return (
    <ModalContent
      aria-labelledby='modal-title'
      aria-describedby='modal-description'
      className='modal-container'
      open={show}
      onClose={() => closeModal(type)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={show}>
        <div className='modal-body'>
          <span className='modal-close fas fa-times' onClick={() => closeModal(type)}></span>
          {children}
        </div>
      </Fade>
    </ModalContent>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    show: state.Modal.show,
  };
};

export default connect(mapStateToProps, { closeModal })(Modal);
