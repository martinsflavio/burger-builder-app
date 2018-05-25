import * as actionTypes from './actionTypes';
import axios from "../../utils/axiosAPI";

//Fetch all The orders from API => "Async Code"
export const fetchOrders = () => {
  return  async dispatch => {
    const ordersRes = await axios.get('/orders.json');

    if (ordersRes instanceof Error) {
      dispatch(fetchOrdersFailed(ordersRes));
    } else {
      dispatch(setOrders(ordersRes));
    }
  }
};

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

//Send order to the API => "Async Code"
export const postOrder = order => {
  return  async dispatch => {
    let orderResponse;

    orderResponse = await axios.post('/orders.json', order);

    if (orderResponse instanceof Error) {
      dispatch(postOrderFailed(orderResponse));
    } else {
      dispatch(postOrderSucceed(orderResponse));
    }

  }
};

export const postOrderSucceed = data => {
  return {
    type: actionTypes.POST_ORDER_SUCCEED,
    payload: data
  }
};

export const postOrderFailed = error => {

  return {
    type: actionTypes.POST_ORDER_FAILED,
    payload: error
  }
};

export const loadingStatus = status => {
  return {
    type:actionTypes.LOADING_STATUS,
    payload: status
  }
};

//Fetch a single order from API by the ID => "Async Code"
export const fetchOrderById = id => {
  return async dispatch => {
    const queryParam = `/orders/${id}.json`;

    const ordersRes = await axios.get(queryParam);

    if (ordersRes instanceof Error) {
      dispatch(fetchOrderByIdFailed(ordersRes));
    } else {
      dispatch(setOrderById(ordersRes));
    }
  }
};

export const setOrderById = data => {
  return {
    type: actionTypes.SET_ORDER_BY_ID,
    payload: data
  }
};

export const fetchOrderByIdFailed = error => {
  return {
    type: actionTypes.FETCH_ORDER_BY_ID_FAILED,
    payload: error
  }
};
