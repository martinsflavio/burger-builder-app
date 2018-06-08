import React, { Component } from 'react';
import axios from '../../utils/axiosAPI';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';

import classes from './orders.css';
import Order from "../../components/Order/Order";
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {

  componentDidMount () {
    this.props.fetchOrders();
  };

  shouldComponentUpdate (nextProps) {
    return  nextProps.ordersArray !== this.props.ordersArray ||
            nextProps.loading !== this.props.loading;
  };


  orderListBuilder = ordArray => {
    if (Array.isArray(ordArray)) {
      return ordArray.map(order => {
        return (
          <li key={order.orderId}>
            <Order ingredients={order.ingredients} totalPrice={order.totalPrice}/>
          </li>
        );
      });
    }
  };

  render () {
    let ordersList, errorMessage = null;

    if (this.props.loading) {
      ordersList = (<Spinner/>);
      } else {
      if (this.props.ordersArray) {
        ordersList = (<ul>{this.orderListBuilder(this.props.ordersArray)}</ul>);
      } else {
        errorMessage = (<h3>{this.props.error}</h3>);
      }
    }

    return (
      <div className={classes.Orders}>
        { ordersList }
        { errorMessage }
      </div>
    );
  }
}

// Destructuring state
const mapStateToProps = ({apiConnection:{loading}, orders: {ordersArray, error}}) => {
  return {
    ordersArray,
    error,
    loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: () => dispatch(action.fetchOrders())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(Orders, axios)
);
