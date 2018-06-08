import * as actionTypes from '../actions/actionTypes';
import objDeepCopy from "../../utils/objDeepCopy";

const initialState = {
  user: null,
  error: null
};

const authSuccess = (state, {payload}) => {
  let newState, updatedState;

  newState = objDeepCopy(state);
  updatedState = {
    ...newState,
    error: null,
    user: payload
  };
  return updatedState;
};

const authFail = (state, {payload}) => {
  let newState, updatedState;

  newState = objDeepCopy(state);
  updatedState = {
    ...newState,
    user: null,
    error: payload
  };
  return updatedState;
};


const auth = (state = initialState, action) => {

  switch (action.type) {
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);

    default: return state;
  }

};

export default auth;
