import React from 'react';

import classes from './buildControl.css';

const BuildControl = (props) => (
  <div className={ classes.BuildControl }>
    <div className={ classes.Label }>{ props.label }</div>

    <button 
      disabled={ props.checkForDisable }
      className={ classes.Less }
      onClick={ () => props.removeIngMethod(props.type) }
    >Less</button>

    <button 
      className={ classes.More }
      onClick={ () => props.addIngMethod(props.type) }
    >More</button>

  </div>
);

export default BuildControl;
