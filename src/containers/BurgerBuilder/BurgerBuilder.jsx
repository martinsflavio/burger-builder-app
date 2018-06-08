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
import checkOutOk from "../../utils/burgerHasIngredients";


class BurgerBuilder extends Component {
  state = {
    showOrderSummaryModal: false
  };

  componentWillMount () {
    if(!this.props.ingredients) {
      this.props.fetchIngredients();
    }
  };

  disableIngBtnHandler = type => this.props.ingredients[type] <= 0;

  showOrderSummaryModalHandler = () => this.setState({ showOrderSummaryModal: true });

  purchaseCanceledHandler = () => this.setState({ showOrderSummaryModal: false });

  purchaseContinueHandler = () => this.props.history.push('/checkout');


  render() {
    let orderSummary, burger, burgerHasIngredients;

    orderSummary = null;
    burgerHasIngredients = checkOutOk(this.props.ingredients);

    if (this.props.loading) {
      burger = (<Spinner />);
    }

    if (this.props.ingredients) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredients={this.props.ingredients}
            totalPrice={this.props.totalPrice}
            disableCheckoutBtn={burgerHasIngredients}
            addIngMethod={this.props.onIngredientAdded}
            removeIngMethod={this.props.onIngredientRemoved}
            disableIngBtnHandler={this.disableIngBtnHandler}
            showOrderSummaryModalHandler={this.showOrderSummaryModalHandler}
          />
        </Fragment>
      );
      orderSummary = (
        <OrderSummary
          burgerPrice={this.props.totalPrice}
          ingredients={this.props.ingredients}
          purchaseContinue={this.purchaseContinueHandler}
          purchaseCanceled={this.purchaseCanceledHandler}
        />
      );
    }

    if (this.props.error) {
      burger = (<h3>{this.props.error}</h3>);
    }

    return (
      <Fragment>
        <Modal
          show={this.state.showOrderSummaryModal}
          clickedOutSide={this.purchaseCanceledHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

// Destructuring state
const mapStateToProps = ({burgerBuilder:  {ingredients, totalPrice, error},
                          apiConnection:  {loading}}) => {
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
