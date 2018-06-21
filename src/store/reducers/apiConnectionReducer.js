import * as actionTypes from "../actions/actionTypes";
import objDeepCopy from "../../utils/objDeepCopy";

export const initialState = {
  loading: null
};

const apiConnectionStatus = (state, {payload}) => {
  let newState, loadingState;

  newState = objDeepCopy(state);

  if (typeof payload !== "boolean") {
    loadingState = newState.loading;
  }

  if (typeof payload === "undefined") {
    loadingState = !newState.loading;
  }

  if (typeof payload === "boolean") {
    loadingState = payload;
  }

  return {
    ...newState,
    loading: loadingState
  };
};

export const apiConnection = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.API_CONNECTION_STATUS: return apiConnectionStatus(state, action);
    default: return state;
  }
};

export default apiConnection;
