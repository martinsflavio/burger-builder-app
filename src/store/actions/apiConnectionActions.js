import * as actionTypes from "./actionTypes";

export const apiConnectionStatus = status => ({type:actionTypes.API_CONNECTION_STATUS, payload: status});
