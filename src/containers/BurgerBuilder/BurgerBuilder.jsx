import React, { Component, Fragment } from 'react';
import axios from '../../utils/axiosAPI';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spiner/Spiner';
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
    let ingredients, ingredientsPrices;

    ingredients = await axios.get('./ingredients.json');
    ingredientsPrices = await axios.get('/ingredientsPrices.json');

    if (ingredientsPrices instanceof Error || ingredients instanceof Error) {
      this.setState({error: 'Server connection Fail!'});
    } else {
      this.setState({
        ingredients: ingredients.data,
        ingredientsPrices: ingredientsPrices.data
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

  purchaseContinueHandler = async () => {
    let orderRequest;

    this.setState({loading: true});

    orderRequest = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      costumer: {
        name: 'Flavio',
        Address: {
          street: '4711 Callan #3',
          zipCode: '94015',
          country: 'usa'
        },
        email: 'flaviodosreismartins@gmail.com'
      
      },
      deliveryMethod: 'express'
    };

    await axios.post( '/orders.json', orderRequest);

    this.setState({loading: false, purchasing: false});
  };

  render() {
    let orderSummary, burger;

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
          clicked={this.purchaseCanceledHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
