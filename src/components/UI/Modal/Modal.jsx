import React, { Fragment } from 'react';
import BackDrop from '../BackDrop/BackDrop'
import classes from './modal.css';

const Modal = (props) => {
  let showModal;
  
  showModal = {
    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
    opacity: props.show ? '1' : '0'
  };

  return(
    <Fragment>
      <BackDrop 
        show={ props.show }
        clicked={ props.purchaseCanceled }
      />
      <div 
        className={ classes.Modal }
        style={ showModal } >
          { props.children }
      </div>
    </Fragment>
  )
};

export default Modal;
