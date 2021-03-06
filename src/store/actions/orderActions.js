import * as actionTypes from './actionTypes';
import axios from "../../utils/axiosAPI";
import { apiConnectionStatus } from './apiConnectionActions';

export const setOrders = data => ({type: actionTypes.SET_ORDERS, payload: data});

export const fetchOrdersFailed = error => ({type: actionTypes.FETCH_ORDERS_FAILED, payload: error});

export const postOrderSucceed = data => ({type: actionTypes.POST_ORDER_SUCCEED, payload: data});

export const postOrderFailed = error => ({type:  actionTypes.POST_ORDER_FAILED, payload: error});

export const setOrderById = data => ({type: actionTypes.SET_ORDER_BY_ID, payload: data});

export const fetchOrderByIdFailed = error => ({type: actionTypes.FETCH_ORDER_BY_ID_FAILED, payload: error});

//Fetch all The orders from API => "Async Code"
export const fetchOrders = (userId, token) => {
  return  async dispatch => {
    dispatch(apiConnectionStatus(true));
    axios.get(`/orders/${userId}.json?auth=${token}`)
      .then(res => {
        dispatch(setOrders(res));
        dispatch(apiConnectionStatus(false));
      }).catch(error => {
      dispatch(fetchOrdersFailed(error));
      dispatch(apiConnectionStatus(false));
    });
  }
};

//Fetch a single order from API by the ID => "Async Code"
export const fetchOrderById = (userId, orderId, token) => {
  return async dispatch => {
    const queryParam = `/orders/${userId}/${orderId}.json?auth=${token}`;

    dispatch(apiConnectionStatus(true));
    axios.get(queryParam)
      .then(res => {
        dispatch(setOrderById(res));
        dispatch(apiConnectionStatus(false));
      }).catch(error => {
        dispatch(fetchOrderByIdFailed(error));
        dispatch(apiConnectionStatus(false));
    });
  }
};

//Send order to the API => "Async Code"
export const postOrder = (order, userId, token) => {
  return dispatch => {

    dispatch(apiConnectionStatus(true));
    axios.post(`/orders/${userId}.json?auth=${token}`, order)
      .then(res => {
      dispatch(postOrderSucceed(res));
      dispatch(apiConnectionStatus(false));
    }).catch(error => {
      dispatch(postOrderFailed(error));
      dispatch(apiConnectionStatus(false));
    });
  }
};
