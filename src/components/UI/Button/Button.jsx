import React from 'react';
import classes from './button.css';

const Button = (props) => {
  let btnStatus = false, btnClasses;

  btnClasses = [classes.Button, classes[props.btnType]];

  if (props.disable) {
    btnStatus = true;
    btnClasses.push(classes.Disable)
  }

  return (
    <button
      disabled={btnStatus}
      className={btnClasses.join(' ')}
      onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default Button;
