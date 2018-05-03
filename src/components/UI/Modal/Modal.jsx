import React, {Component, Fragment} from 'react';
import classes from './modal.css';
import BackDrop from '../BackDrop/BackDrop';
import PropTypes from 'prop-types';


class Modal extends Component {

  shouldComponentUpdate (nextProps) {
   return nextProps.show !== this.props.show ||
          nextProps.children !== this.props.children;
  };

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
          clicked={this.props.clickedOutSide}
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
  clickedOutSide: PropTypes.func.isRequired
};

export default Modal;
