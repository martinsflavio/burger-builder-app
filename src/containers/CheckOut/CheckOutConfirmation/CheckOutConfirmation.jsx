import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as action from '../../../store/actions/index';
import axios from '../../../utils/axiosAPI';
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import classes from './checkOutConfirmation.css';

import HasOrder from "./HasOrder/HasOrder";
import HasError from "./HasError/HasError";

class CheckoutConfirmation extends Component {

  componentDidMount () {
    this.props.fetchOrderById(this.props.postSucceedId);
  }

  redirectHandler = path => this.props.history.push(path);

  render () {
    let checkOutState = null;

    if (this.props.confirmedOrder || this.props.error) {
      if (this.props.confirmedOrder) {
        checkOutState = (<HasOrder
                            confirmedOrder={this.props.confirmedOrder}
                            id={this.props.postSucceedId}
                            redirectTo={this.redirectHandler}/>);
      }
      if (this.props.error){
        checkOutState = (<HasError error={this.props.error}/>);
      }
    }

    return(
      <div className={classes.CheckOutConfirmation}>
        { checkOutState }
      </div>
    )
  };
}

const mapStateToProps = ({orders:{postSucceedId, confirmedOrder, error}}) => {
  return {
    postSucceedId,
    confirmedOrder,
    error
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
