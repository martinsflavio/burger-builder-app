import React from 'react';
import classes from './button.css';

const Button = (props) => {
  let btnStatus = false, style = {};

  if (props.disable) {
    btnStatus = true;
    style = {
      "color": "gray"
    };
  }

  return (
    <button style={style}
      disabled={btnStatus}
      className={[classes.Button, classes[props.btnType]].join(' ')}
      onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default Button;
