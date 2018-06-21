import * as actionTypes from "../actions/actionTypes";
import objDeepCopy from "../../utils/objDeepCopy";

export const initialState = {
  ordersArray: null,
  postSucceedId: null,
  confirmedOrder: null,
  error: null
};

// Util Function for transforming obj into arrays
const orderArrayBuilder = ordObj => {
  const ordArray = [];

  for (const key in ordObj){
    if (ordObj.hasOwnProperty(key)) {
      ordArray.push({...ordObj[key], orderId: key});
    }
  }
  return ordArray;
};

// Orders list related func's
const setOrders = (state, {payload:{data}}) => {
  let newState = objDeepCopy(state);

  return {
    ...newState,
    error: null,
    ordersArray: orderArrayBuilder(data)
  };
};

const fetchOrdersFailed = (state, {payload:{message}}) => {
  let newState = objDeepCopy(state);

  return {
    ...newState,
    error: message
  };
};

const postOrderSucceed = (state, {payload:{data}}) => {
  let newState  = objDeepCopy(state);

  return {
    ...newState,
    error: null,
    postSucceedId: data.name
  };
};

const postOrderFailed = (state, {payload:{message}}) => {
  let newState = objDeepCopy(state);

  return {
    ...newState,
    error: message
  };
};

// Single Order related func's
const setOrderById = (state, {payload:{data}}) => {
  let newState = objDeepCopy(state);

  return {
    ...newState,
    error: null,
    confirmedOrder: data
  };
};

const setOrderByIdFailed = (state, {payload:{message}}) => {
  let newState = objDeepCopy(state);

  return {
    ...newState,
    error: message
  };
};

export const order = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ORDERS: return setOrders(state, action);
    case actionTypes.FETCH_ORDERS_FAILED: return fetchOrdersFailed(state, action);
    case actionTypes.POST_ORDER_SUCCEED: return postOrderSucceed(state, action);
    case actionTypes.POST_ORDER_FAILED: return postOrderFailed(state, action);
    case actionTypes.SET_ORDER_BY_ID: return setOrderById(state, action);
    case actionTypes.FETCH_ORDER_BY_ID_FAILED: return setOrderByIdFailed(state, action);
    default: return state;
  }
};

export default order;
