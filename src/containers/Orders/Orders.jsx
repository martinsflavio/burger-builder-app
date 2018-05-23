import React, { Component } from 'react';
import axios from '../../utils/axiosAPI';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';

import classes from './orders.css';
import Order from "../../components/Order/Order";
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {

  async componentDidMount () {
    this.props.fetchOrders();
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
    let ordersList;

    if (this.props.error) {
      ordersList = (<h3>{this.props.error}</h3>);
    } else {
      if (this.props.orders) {
        ordersList = (<ul>{this.orderListBuilder(this.props.orders)}</ul>);
      } else {
        ordersList = (<Spinner/>);
      }
    }

    return (
      <div className={classes.Orders}>
        {ordersList}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.ordersArray,
    error: state.order.error
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
