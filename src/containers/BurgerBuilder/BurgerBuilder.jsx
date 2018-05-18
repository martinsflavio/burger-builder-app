import React, { Component, Fragment } from 'react';
import axios from '../../utils/axiosAPI';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    ingredientsPrices: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null
  };

  async componentDidMount () {
    let initObj;

    initObj = await axios.get('initialize.json');

    if (initObj instanceof Error) {
      this.setState({error: 'Server connection Fail!'});
    } else {
      initObj = {...initObj.data};

      this.setState({
        ingredients: initObj.ingredients,
        ingredientsPrices: initObj.ingredientsPrices
      });
    }
  };

  disableCheckoutBtnHandler = ingredients => {
    let sum;
    sum = Object.values(ingredients).reduce((a, b) => a + b, 0);
    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = type => {
    let newIngredients, newTotalPrice;
    //update ingredients list
    newIngredients = { ...this.state.ingredients };
    newIngredients[type]++;
    //update burger price
    newTotalPrice = this.state.totalPrice;
    newTotalPrice = newTotalPrice + this.state.ingredientsPrices[type];
    //setState
    this.setState({
      totalPrice: newTotalPrice,
      ingredients: newIngredients
    });
    this.disableCheckoutBtnHandler(newIngredients);
  };

  removeIngredientHandler = type => {
    let newIngredients, newTotalPrice;
    //update ingredients list
    newIngredients = { ...this.state.ingredients };
    if (newIngredients[type] <= 0) {
      return
    }
    newIngredients[type]--;
    //update burger price
    newTotalPrice = this.state.totalPrice;
    newTotalPrice = newTotalPrice - this.state.ingredientsPrices[type];
    //setState
    this.setState({
      totalPrice: newTotalPrice,
      ingredients: newIngredients
    });
    this.disableCheckoutBtnHandler(newIngredients);
  };

  disableIngBtnHandler = type => {
    let ingredient = this.state.ingredients[type];

    return ingredient <= 0;
  };

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCanceledHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    let state;

    state = {
      ingredients: {...this.state.ingredients},
      totalPrice: this.state.totalPrice
    };

    this.props.history.push({
      pathname:'/checkout',
      state: state
    })
  };

  render() {
    let orderSummary, burger;

    // Local Errors Handler
    burger = this.state.error ? <h3>{this.state.error}</h3> : <Spinner />;
    orderSummary = null;

    if (this.state.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            addIngMethod={this.addIngredientHandler}
            removeIngMethod={this.removeIngredientHandler}
            disableIngBtnHandler={this.disableIngBtnHandler}
            disableCheckoutBtnHandler={this.state.purchasable}
            purchasingHandler={this.purchasingHandler}
          />
        </Fragment>
      );
      orderSummary = <OrderSummary
        burgerPrice={this.state.totalPrice}
        ingredients={this.state.ingredients}
        purchaseContinue={this.purchaseContinueHandler}
        purchaseCanceled={this.purchaseCanceledHandler}
      />
    }

    if (this.state.loading) { orderSummary = <Spinner />; }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          clickedOutSide={this.purchaseCanceledHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
