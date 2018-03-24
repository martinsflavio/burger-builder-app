import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const BURGER_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      meat: 0,
      cheese: 0
    },
    totalPrice: 4,
    purchaseble: false,
    purchasing: false
  };

  disableCheckoutBtnHandler = (ingredients) => {
    let sum;
    sum = Object.values(ingredients).reduce((a, b) => a + b, 0);
    this.setState({ purchaseble: sum > 0 });
  };

  addIngredientHandler = (type) => {
    let newIngredients, newTotalPrice;
    //update ingredients list
    newIngredients = { ...this.state.ingredients };
    newIngredients[type]++;
    //update burger price
    newTotalPrice = this.state.totalPrice;
    newTotalPrice = newTotalPrice + BURGER_PRICES[type];
    //setState
    this.setState({
      totalPrice: newTotalPrice,
      ingredients: newIngredients
    });
    this.disableCheckoutBtnHandler(newIngredients);
  };

  removeIngredientHandler = (type) => {
    let newIngredients, newTotalPrice;
    //update ingredients list
    newIngredients = { ...this.state.ingredients };
    if (newIngredients[type] <= 0) {
      return
    }
    newIngredients[type]--;
    //update burger price
    newTotalPrice = this.state.totalPrice;
    newTotalPrice = newTotalPrice - BURGER_PRICES[type];
    //setState
    this.setState({
      totalPrice: newTotalPrice,
      ingredients: newIngredients
    });
    this.disableCheckoutBtnHandler(newIngredients);
  };

  disableIngBtnHandler = (type) => {
    let ingredient = this.state.ingredients[type];

    return ingredient <= 0;
  };

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCanceledHandler = () => {
    this.setState({ purchasing: false });
  };

  puchaseContinueHandler = () => {
    console.log('you continue');

  };

  render() {

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          purchaseCanceled={this.purchaseCanceledHandler}>
          <OrderSummary
            burgerPrice={this.state.totalPrice}
            ingredients={this.state.ingredients}
            puchaseContinue={this.puchaseContinueHandler}
            purchaseCanceled={this.purchaseCanceledHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          totalPrice={this.state.totalPrice}
          addIngMethod={this.addIngredientHandler}
          removeIngMethod={this.removeIngredientHandler}
          disableIngBtnHandler={this.disableIngBtnHandler}
          disableCheckoutBtnHandler={this.state.purchaseble}
          purchasingHandler={this.purchasingHandler}
        />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
