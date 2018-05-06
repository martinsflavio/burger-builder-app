import React, { Component } from 'react';
import axios from '../../utils/axiosAPI';
import classes from './orders.css';
import Order from "../../components/Order/Order";
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: null,
    error: null
  };
  //TODO: refactor obj transformation try to eliminate orderArrayBuilder and orderListBuilder
  async componentDidMount () {
    const ordersReq = await axios.get('/orders.json');

    if (ordersReq instanceof Error) {
      this.setState({error: ordersReq});
    } else {
      this.setState({orders: [...this.orderArrayBuilder(ordersReq.data)]});
    }
  };

  orderArrayBuilder = (ordObj) => {
    const ordArray = [];

    for (const key in ordObj){
      if (ordObj.hasOwnProperty(key)) {
        ordArray.push({...ordObj[key], orderId: key});
      }
    }
    return ordArray;
  };

  orderListBuilder = (ordArray) => {
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

    if (this.state.orders) {
      ordersList = (<ul>{this.orderListBuilder(this.state.orders)}</ul>);
    } else {
      ordersList = (<Spinner/>);
    }

    return (
      <div className={classes.Orders}>
        {ordersList}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
