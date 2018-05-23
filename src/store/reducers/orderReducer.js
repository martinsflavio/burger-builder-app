import * as actionTypes from '../actions/actionTypes';
import objDeepCopy from "../../utils/objDeepCopy";

export const initialState = {
  ordersArray: null,
  error: null
};

const orderArrayBuilder = ordObj => {
  const ordArray = [];

  for (const key in ordObj){
    if (ordObj.hasOwnProperty(key)) {
      ordArray.push({...ordObj[key], orderId: key});
    }
  }
  return ordArray;
};

const setOrders = (state, {payload:{data}}) => {

  let newState, updatedState;

  newState = objDeepCopy(state);
  updatedState = {
    ...newState,
    ordersArray: orderArrayBuilder(data)
  };

  return updatedState;
};

const fetchOrdersFailed = (state, {payload:{message}}) => {
  let newState, updatedState;

  newState = objDeepCopy(state);
  updatedState = {
    ...newState,
    error: message
  };

  return updatedState;
};

export const order = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ORDERS: return setOrders(state, action);
    case actionTypes.FETCH_ORDERS_FAILED: return fetchOrdersFailed(state, action);
    default: return state;
  }
};

export default order;
