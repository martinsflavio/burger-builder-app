import * as actionTypes from "../actions/actionTypes";
import objDeepCopy from "../../utils/objDeepCopy";

// Util function
const userDataTransformer = (user) => {
  if (!user) {
    return null;
  } else {
    let currentDate, tokenExpirationTime, newUser, tokenLiveTime;

    newUser = objDeepCopy(user);
    // TODO REMOVE - 3550
    tokenLiveTime = (newUser.expiresIn - 3550) * 1000;
    currentDate = Date.now();
    tokenExpirationTime = currentDate + tokenLiveTime;


    return {
      ...newUser,
      expiresIn: tokenExpirationTime
    };
  }
};

// localStorage manipulators
const setToLocalStorage = (next, action) => {
  const newActionCopy = objDeepCopy(action);
  const user = userDataTransformer(newActionCopy.payload.data);
  let updatedAction;

  updatedAction = {
    ...newActionCopy,
    payload: {
      data: user
    }
  };
  localStorage.setItem("user", JSON.stringify(user));
  next(updatedAction);
};

const removeFromLocalStorage = (next, action) => {
  localStorage.removeItem("user");
  next(action);
};

const getFromLocalStorage = (next, action) => {
  // Inject's payload to action obj with (user) from local storage or (null)
  const newAction = objDeepCopy(action);
  let localUser;

  localUser = localStorage.getItem("user");

  if (localUser) {
    localUser = JSON.parse(localUser);

    const currentDate = Date.now();
    const tokenExpirationTime = localUser.expiresIn;

    if (tokenExpirationTime > currentDate) {
      newAction.payload = localUser;

      next(newAction);
    } else {
      localStorage.removeItem("user");
      next(newAction);
    }

  } else {
    next(newAction);
  }
};

// Filter actions relevant to localStorage
const userPersistence = store => next => action => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS: setToLocalStorage(next, action);
      break;
    case actionTypes.AUTH_LOGOUT: removeFromLocalStorage(next, action);
      break;
    case actionTypes.CHECK_AUTH_STATE: getFromLocalStorage(next, action);
      break;
    default: next(action);
  }
};

export default userPersistence;
