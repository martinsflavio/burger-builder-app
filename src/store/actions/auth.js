import * as actionTypes from "./actionTypes";
import axios from "../../utils/axiosAPI";


export const apiConnectionStatus = status => ({type: actionTypes.API_CONNECTION_STATUS, payload: status});

export const authSuccess = data => ({type: actionTypes.AUTH_SUCCESS, payload: data});

export const authFail = error => ({type: actionTypes.AUTH_FAIL, payload: error});

// Fetch data from API "Async Code"
export const authStart = () => {
  return async dispatch => {
    let isUser;

    dispatch(apiConnectionStatus(true));
    isUser = await axios.get('user.json');

    if (isUser instanceof Error) {
      dispatch(authFail(isUser));
    } else {
      dispatch(authSuccess(isUser));
    }
    dispatch(apiConnectionStatus(false));
  }
};
