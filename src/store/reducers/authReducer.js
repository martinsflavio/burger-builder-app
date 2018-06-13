import * as actionTypes from '../actions/actionTypes';
import objDeepCopy from "../../utils/objDeepCopy";

const initialState = {
  user: null,
  error: null
};

const authSuccess = (state, {payload:{data}}) => {
  let newState = objDeepCopy(state);

  if (data.idToken && data.expiresIn && data.localId) {
    let tokenExpiration = new Date(new Date().getTime() + data.expiresIn * 1000);

    localStorage.setItem("token", data.idToken);
    localStorage.setItem("userId", data.localId);
    localStorage.setItem("tokenExpiration", tokenExpiration.toString());
  }

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

  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("tokenExpiration");

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
