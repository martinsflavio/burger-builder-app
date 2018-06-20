import * as actionTypes from '../store/actions/actionTypes';
import objDeepCopy from "./objDeepCopy";

const setToLocalStorage = (action) => {
  const newAction = objDeepCopy(action);

  // Mutating action Object
  newAction.payload.data.expiresIn = new Date().getTime() + newAction.payload.data.expiresIn * 1000;

  // Set user payload to localStorage
  localStorage.setItem("user", JSON.stringify(newAction.payload.data));

  return newAction;
};

const removeFromLocalStorage = (action) => {
  localStorage.removeItem("user");
  return action;
};

const validateUser = (action) => {
  const newAction = objDeepCopy(action);
  let localUser = localStorage.getItem("user");

  /* check if localStorage has user obj
        true: go to the nested if statement
        false: returns action without payload */
  if (localUser) {
    localUser = JSON.parse(localUser);

    /* check if token still valid
          true: returns actions obj with user from localStorage as payload
          false: returns action without payload */
    if (localUser.expiresIn > new Date().getTime()) {

      // update the expiration date at the localUser obj
      console.log(localUser.expiresIn);
      console.log(new Date().getTime());

      localUser.expiresIn = localUser.expiresIn - new Date().getTime();

      console.log(`Token expires in: ${new Date(localUser.expiresIn).getMinutes()}`);

      return {
        ...newAction,
        payload: {
          ...newAction.payload,
          user: localUser
        }
      }

    } else {
     return action;
    }

  } else {
    return action;
  }
};


export const localStorageManager = store => next => action => {

  switch (action.type) {
    case actionTypes.AUTH_SUCCESS: next(setToLocalStorage(action));
      break;
    case actionTypes.AUTH_LOGOUT: next(removeFromLocalStorage(action));
      break;
    case actionTypes.CHECK_AUTH_STATE: next(validateUser(action));
      break;
    default: next(action);
  }
};

