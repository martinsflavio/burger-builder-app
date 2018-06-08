import * as actionTypes from './actionTypes';
import axios from "../../utils/axiosAPI";

export const setOrders = data => ({type: actionTypes.SET_ORDERS, payload: data});

export const fetchOrdersFailed = error => ({type: actionTypes.FETCH_ORDERS_FAILED, payload: error});

export const apiConnectionStatus = status => ({type: actionTypes.API_CONNECTION_STATUS, payload: status});

export const postOrderSucceed = data => ({type: actionTypes.POST_ORDER_SUCCEED, payload: data});

export const postOrderFailed = error => ({type:  actionTypes.POST_ORDER_FAILED, payload: error});

export const setOrderById = data => ({type: actionTypes.SET_ORDER_BY_ID, payload: data});

export const fetchOrderByIdFailed = error => ({type: actionTypes.FETCH_ORDER_BY_ID_FAILED, payload: error});

//Fetch all The orders from API => "Async Code"
export const fetchOrders = () => {
  return  async dispatch => {

    dispatch(apiConnectionStatus(true));
    const ordersRes = await axios.get('/orders.json');

    if (ordersRes instanceof Error) {
      dispatch(fetchOrdersFailed(ordersRes));
    } else {
      dispatch(setOrders(ordersRes));
    }

    dispatch(apiConnectionStatus(false));
  }
};

//Fetch a single order from API by the ID => "Async Code"
export const fetchOrderById = id => {
  return async dispatch => {
    const queryParam = `/orders/${id}.json`;

    dispatch(apiConnectionStatus(true));
    const ordersRes = await axios.get(queryParam);

    if (ordersRes instanceof Error) {
      dispatch(fetchOrderByIdFailed(ordersRes));
    } else {
      dispatch(setOrderById(ordersRes));
    }

    dispatch(apiConnectionStatus(false));
  }
};

//Send order to the API => "Async Code"
export const postOrder = order => {
  return async dispatch => {
    let orderResponse;

    dispatch(apiConnectionStatus(true));
    orderResponse = await axios.post('/orders.json', order);

    if (orderResponse instanceof Error) {
      dispatch(postOrderFailed(orderResponse));
    } else {
      dispatch(postOrderSucceed(orderResponse));
    }

    dispatch(apiConnectionStatus(false));
  }
};
