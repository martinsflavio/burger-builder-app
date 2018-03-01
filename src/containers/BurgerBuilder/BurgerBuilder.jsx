import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  }

  addIngredientHandler = (type) => {  
    let newIngredients, newTotalPrice;
    //update ingredients list
    newIngredients = {...this.state.ingredients};
    newIngredients[type]++;
    //update burger price
    newTotalPrice = this.state.totalPrice;
    newTotalPrice = newTotalPrice + BURGER_PRICES[type];
    //setState
    this.setState({totalPrice: newTotalPrice, ingredients: newIngredients});
  }

  removeIngredientHandler = (type) => {
    let newIngredients, newTotalPrice;
    //update ingredients list
    newIngredients = {...this.state.ingredients};
    if (newIngredients[type] <= 0) {return};
    newIngredients[type]--;
    //update burger price
    newTotalPrice = this.state.totalPrice;
    newTotalPrice = newTotalPrice - BURGER_PRICES[type];
    //setState
    this.setState({totalPrice: newTotalPrice, ingredients: newIngredients});
  }

  disableBtnHandler = (type) => {
    let ingredient = this.state.ingredients[type];
    
    if (ingredient <= 0) {
      ingredient = true;
    } else {
      ingredient = false;
    }
    return ingredient;
  }

  render () {

    return (
      <Fragment>
        <Burger ingredients={ this.state.ingredients } />
        <BuildControls 
          totalPrice={ this.state.totalPrice }
          addIngMethod={ this.addIngredientHandler }
          removeIngMethod={ this.removeIngredientHandler }
          disableChecker={ this.disableBtnHandler }
        />
      </Fragment>
    );
  }
}

export default BurgerBuilder;
