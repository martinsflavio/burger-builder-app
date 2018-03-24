import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './buildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' }
];

const BuildControls = (props) => {
  //formating burger final price
  let price = props.totalPrice.toFixed(2);

  return (
    <div className={classes.BuildControls}>
      <h3>Burger Price: $ {price}</h3>
      {
        controls.map(ctrl => (
          <BuildControl
            key={ctrl.type}
            type={ctrl.type}
            label={ctrl.label}
            addIngMethod={props.addIngMethod}
            removeIngMethod={props.removeIngMethod}
            disableIngBtnHandler={props.disableIngBtnHandler(ctrl.type)}
          />
        ))
      }
      <button
        className={classes.OrderButton}
        disabled={!props.disableCheckoutBtnHandler}
        onClick={props.purchasingHandler}
      >Order Now</button>
    </div>
  );
}

export default BuildControls;
