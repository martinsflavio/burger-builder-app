import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../../../store/actions/index';
import axios from '../../../utils/axiosAPI';
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import classes from './checkOutConfirmation.css';

import Burger from "../../../components/Burger/Burger";
import Button from "../../../components/UI/Button/Button";

class CheckoutConfirmation extends Component {

  componentDidMount () {
    this.props.fetchOrderById(this.props.postSucceedId);
  }
  //TODO DEVELOPER: BUILD THIS VIEW
  render () {
    let checkOutConfirmation;

    if (this.props.postSucceedId) {
      checkOutConfirmation = (<h3> Your Order </h3>);
    } else {
      checkOutConfirmation = (<Redirect to="/"/>);
    }

    return(
      <div className={classes.CheckOutConfirmation}>
        { checkOutConfirmation }
      </div>
    )
  };
}

const mapStateToProps = ({orders:{postSucceedId, confirmedOrder}}) => {
  return {
    postSucceedId,
    confirmedOrder
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrderById: (orderId) => dispatch(action.fetchOrderById(orderId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(CheckoutConfirmation, axios)
);
