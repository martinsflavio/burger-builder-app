import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
  let ingredientsList, totalPrice;

  //formating burger final price
  totalPrice = props.burgerPrice.toFixed(2);
  
  //turn ingredients obj into a array
  ingredientsList = Object.keys(props.ingredients).map((iKey, id) => {
    let formatString;
    //Capitalize Ingredients string
    formatString = s => s.charAt(0).toUpperCase() + s.slice(1); 
    return (
      <li key={id}>
        { formatString(iKey) } : { props.ingredients[iKey] }
      </li>
    );
  })

  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>delicious Burger with following ingredients:</p>
      <ul>
        { ingredientsList }
      </ul>
      <p><strong>{ `$ ${ totalPrice }` }</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={ props.purchaseCanceled }>Cancel</Button>
      <Button btnType="Success" clicked={ props.puchaseContinue }>Continue</Button>
    </Fragment>
  );
};

export default OrderSummary;
