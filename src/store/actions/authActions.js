import * as actionTypes from "./actionTypes";
import axios from "axios";


export const apiConnectionStatus = status => ({type: actionTypes.API_CONNECTION_STATUS, payload: status});

export const authSuccess = data => ({type: actionTypes.AUTH_SUCCESS, payload: data});

export const authFail = error => ({type: actionTypes.AUTH_FAIL, payload: error});

// Fetch data from API "Async Code"
export const authStart = (email, password, createNewAccount) => {
  return dispatch => {
    let queryUrl, apiKey;
    const userData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    apiKey = "AIzaSyDpTWzHu6GlufJ1S6Ng4DPI9DdQ7m8dH5Y";
    if (createNewAccount) {
      queryUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`;
    } else {
      queryUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;
    }

    dispatch(apiConnectionStatus(true));
    axios.post(queryUrl, userData)
      .then(res => dispatch(authSuccess(res)))
      .catch(err => dispatch(authFail(err.response)));
    dispatch(apiConnectionStatus(false));
  }
};
