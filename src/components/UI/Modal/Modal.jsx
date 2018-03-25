import React, { Component, Fragment } from 'react';
import BackDrop from '../BackDrop/BackDrop';
import PropTypes from 'prop-types'
import classes from './modal.css';

class Modal extends Component {

  shouldComponentUpdate = nextProps => nextProps.show !== this.props.show;

  render () {
    let showModal;

    showModal = {
      transform:this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
      opacity: this.props.show ? '1' : '0'
    };

    return (
      <Fragment>
        <BackDrop
          show={this.props.show}
          clicked={this.props.purchaseCanceled}
        />
        <div
          className={classes.Modal}
          style={showModal} >
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  purchaseCanceled: PropTypes.func.isRequired
}

export default Modal;
