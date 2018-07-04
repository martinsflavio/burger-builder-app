import * as actionTypes from "../actions/actionTypes";
import objDeepCopy from "../../utils/objDeepCopy";

const initialState = {
  user: null,
  error: null
};

const authSuccess = (state, {payload:{data}}) => {
  let newState = objDeepCopy(state);

  return {
    ...newState,
    error: null,
    user: data
  };
};

const authFail = (state, {payload:{data:{error}}}) => {
  let newState = objDeepCopy(state);

  return {
    ...newState,
    user: null,
    error
  };
};

const authLogout = (state) => {
  let newState = objDeepCopy(state);

  return {
    ...newState,
    user: null,
    error: null
  }
};

const checkAuthState = (state, action) => {
  const newState = objDeepCopy(state);

  if (action.payload) {
    return {
      ...newState,
      user: action.payload
    }
  } else {
    return {
      ...newState,
      user: null,
      error: null
    }
  }

};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state);
    case actionTypes.CHECK_AUTH_STATE: return checkAuthState(state, action);
    default: return state;
  }
};

export default auth;
