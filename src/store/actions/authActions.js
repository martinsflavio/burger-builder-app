import * as actionTypes from "./actionTypes";
import axios from "axios";
import { apiConnectionStatus } from "./apiConnectionActions";

const API_KEY = "AIzaSyDpTWzHu6GlufJ1S6Ng4DPI9DdQ7m8dH5Y";

export const authSuccess = data => ({type: actionTypes.AUTH_SUCCESS, payload: data});

export const authFail = error => ({type: actionTypes.AUTH_FAIL, payload: error});

export const authLogout = () => ({type: actionTypes.AUTH_LOGOUT});

export const checkAuthState = () => ({type: actionTypes.CHECK_AUTH_STATE});

// Fetch data from API => "Async Code"
export const authStart = (email, password, createNewAccount) => {
  return dispatch => {
    let queryUrl = null;

    const userData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    if (createNewAccount) {
      queryUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=`;
    } else {
      queryUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=`;
    }

    dispatch(apiConnectionStatus(true));
    axios.post(queryUrl.concat(API_KEY), userData)
      .then(res => {
        dispatch(authSuccess(res));
        dispatch(apiConnectionStatus(false));
      }).catch(err => {
        dispatch(authFail(err.response));
        dispatch(apiConnectionStatus(false));
      });

  }
};

