import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../store/actions/index';
import axios from '../../../utils/axiosAPI';
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import classes from './checkOutConfirmation.css';

import HasOrder from "./HasOrder/HasOrder";
import HasError from "./HasError/HasError";
import Spinner from "../../../components/UI/Spinner/Spinner";

class CheckoutConfirmation extends Component {

  componentDidMount () {
    if (this.props.postSucceedId) {
      this.props.fetchOrderById(this.props.postSucceedId, this.props.user.idToken);
    } else {
      this.props.history.push("/");
    }
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
        {
          checkOutState ?
            checkOutState :
            <Spinner />
        }
      </div>
    )
  };
}

const mapStateToProps = ({ orders: {postSucceedId, confirmedOrder, error},
                           auth:   {user}}) => {
  return {
    postSucceedId,
    confirmedOrder,
    user,
    error
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrderById: (orderId, token) => dispatch(action.fetchOrderById(orderId, token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(CheckoutConfirmation, axios)
);
