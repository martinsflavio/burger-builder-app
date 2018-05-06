import React from 'react';
import classes from './order.css';

const Order = (props) => {
  let ingArray;

  ingArray = Object.entries(props.ingredients)
    .map(ing => (<span key={ing[0]}>{`${ing[0]}: ${ing[1]}`}</span>));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingArray}</p>
      <p>Price: <strong>USD {props.totalPrice.toFixed(2)}</strong></p>
    </div>
  );

};

export default Order;
