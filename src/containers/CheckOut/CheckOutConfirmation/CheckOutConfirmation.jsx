import React, { Component, Fragment } from 'react';
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

  redirectHandler = path => this.props.history.push(path);

  render () {
    let checkOutConfirmation = null;

    if (!this.props.postSucceedId) {
      checkOutConfirmation = (<Redirect to="/"/>);
    }

    return(
      <div className={classes.CheckOutConfirmation}>
        {
          this.props.confirmedOrder ?
            <Fragment>
              <h3>Order Confirmation</h3>
                <Burger ingredients={this.props.confirmedOrder.ingredients}/>
              <div>
                <h3>TotalPrice:<span> $ {this.props.confirmedOrder.totalPrice.toFixed(2)}</span></h3>
                <h4>Order protocol: <span>{this.props.postSucceedId}</span></h4>
                <Button btnType="Success" clicked={() => this.redirectHandler("/orders")}>See my Orders</Button>
                <Button btnType="Success" clicked={() => this.redirectHandler("/")}>Build another Burger</Button>
              </div>
            </Fragment> :
            checkOutConfirmation
        }
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
