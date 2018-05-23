import React, { Component, Fragment } from 'react';
import axios from '../../utils/axiosAPI';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';


class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount () {
    this.props.fetchIngredients();
  };

  disableCheckoutBtnHandler = ingredients => (Object.values(ingredients).reduce((a, b) => a + b, 0) > 0);

  disableIngBtnHandler = type => this.props.ingredients[type] <= 0;

  purchasingHandler = () => this.setState({ purchasing: true });

  purchaseCanceledHandler = () => this.setState({ purchasing: false });

  purchaseContinueHandler = () => this.props.history.push('/checkout');


  render() {
    let orderSummary, burger;

    // Local Errors Handler
    burger = this.props.error ? <h3>{this.props.error}</h3> : <Spinner />;
    orderSummary = null;

    if (this.props.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredients={this.props.ingredients}
            totalPrice={this.props.totalPrice}
            addIngMethod={this.props.onIngredientAdded}
            removeIngMethod={this.props.onIngredientRemoved}
            disableIngBtnHandler={this.disableIngBtnHandler}
            disableCheckoutBtnHandler={this.disableCheckoutBtnHandler}
            purchasingHandler={this.purchasingHandler}
          />
        </Fragment>
      );
      orderSummary = <OrderSummary
        burgerPrice={this.props.totalPrice}
        ingredients={this.props.ingredients}
        purchaseContinue={this.purchaseContinueHandler}
        purchaseCanceled={this.purchaseCanceledHandler}
      />
    }

    if (this.props.loading) { orderSummary = <Spinner />; }

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

const mapStateToProps = ({burgerBuilder:{ingredients, totalPrice, loading, error}}) => {
  return {
    ingredients,
    totalPrice,
    loading,
    error
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(action.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(action.removeIngredient(ingName)),
    fetchIngredients: () => dispatch(action.fetchIngredients())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(BurgerBuilder, axios)
);
