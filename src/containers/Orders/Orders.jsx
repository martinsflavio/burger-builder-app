import React, { Component } from 'react';
import axios from '../../utils/axiosAPI';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as action from '../../store/actions/index';

import classes from './orders.css';
import Order from "../../components/Order/Order";
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {

  componentDidMount () {
    if (this.props.user) {
      this.props.fetchOrders(this.props.user.localId, this.props.user.idToken);
    }
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
        {
          this.props.user ?
            ordersList :
            <Redirect to="/auth"/>
        }
        { errorMessage }
      </div>
    );
  }
}

// Destructuring state
const mapStateToProps = ({ apiConnection:  {loading},
                           orders:         {ordersArray, error},
                           auth:           {user}}) => {
  return {
    ordersArray,
    error,
    loading,
    user
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: (userId, token) => dispatch(action.fetchOrders(userId, token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(Orders, axios)
);
