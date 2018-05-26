import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';




class OrderSummary extends Component {
  render () {
    let ingredientsList, totalPrice;

    //formatting burger objToMapTransformer price
    totalPrice = this.props.burgerPrice.toFixed(2);

    //turn ingredients obj into a array
    ingredientsList = Object.keys(this.props.ingredients).map((iKey, id) => {
      let formatString;
      //Capitalize Ingredients string
      formatString = s => s.charAt(0).toUpperCase() + s.slice(1);
      return (
        <li key={id}>
          {formatString(iKey)} : {this.props.ingredients[iKey]}
        </li>
      );
    });

    return (
      <Fragment>
        <h3>Your Order</h3>
        <p>delicious Burger with following ingredients:</p>
        <ul>
          {ingredientsList}
        </ul>
        <p><strong>{`$ ${totalPrice}`}</strong></p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>Cancel</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinue}>Continue</Button>
      </Fragment>
    );
  }
}

OrderSummary.propTypes ={
  burgerPrice: PropTypes.number.isRequired,
  ingredients: PropTypes.objectOf(PropTypes.number),
  purchaseContinue: PropTypes.func.isRequired,
  purchaseCanceled: PropTypes.func.isRequired
};

export default OrderSummary;
