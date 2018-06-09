import * as actionTypes from '../actions/actionTypes';
import objDeepCopy from "../../utils/objDeepCopy";

const initialState = {
  user: null,
  error: null
};

const authSuccess = (state, {payload}) => {
  let newState = objDeepCopy(state);

  return {
    ...newState,
    error: null,
    user: payload
  };
};

const authFail = (state, {payload}) => {
  let newState = objDeepCopy(state);

  return {
    ...newState,
    user: null,
    error: payload
  };
};

const authLogout = (state) => {
  let newState = objDeepCopy(state);

  return {
    ...newState,
    user: null
  }
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state);
    default: return state;
  }
};

export default auth;
