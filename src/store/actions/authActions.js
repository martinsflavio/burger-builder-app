import * as actionTypes from "./actionTypes";
import axios from "axios";
import { apiConnectionStatus } from './apiConnectionActions';

export const authSuccess = data => ({type: actionTypes.AUTH_SUCCESS, payload: data});

export const authFail = error => ({type: actionTypes.AUTH_FAIL, payload: error});

export const authLogout = () => ({type: actionTypes.AUTH_LOGOUT});

// Async Function that dispatch logOut function upon token expiration time
const checkUserTimeOut = ({data:{expiresIn}}) => {
  console.log("checkUserTimeOut was invoked");
  return dispatch => {
    setTimeout(() =>{
      dispatch(authLogout())
    }, +expiresIn * 1000);
  }
};

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
      .then(res => {
        dispatch(authSuccess(res));
        dispatch(checkUserTimeOut(res));
        dispatch(apiConnectionStatus(false));
      }).catch(err => {
        dispatch(authFail(err.response));
        dispatch(apiConnectionStatus(false));
      });

  }
};
