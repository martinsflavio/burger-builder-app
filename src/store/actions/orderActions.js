import * as actionTypes from './actionTypes';
import axios from "../../utils/axiosAPI";

export const setOrders = data => {
  return {
    type: actionTypes.SET_ORDERS,
    payload: data
  }
};

export const fetchOrdersFailed = error => {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    payload: error
  }
};


export const fetchOrders = () => {
  return  async dispatch => {
    const ordersReq = await axios.get('/orders.json');

    if (ordersReq instanceof Error) {
      dispatch(fetchOrdersFailed(ordersReq));
    } else {
      dispatch(setOrders(ordersReq));
    }
  }
};