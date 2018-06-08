import * as actionTypes from '../actions/actionTypes';
import objDeepCopy from '../../utils/objDeepCopy';

export const initialState = {
  ingredients: null,
  ingredientsPrices: null,
  totalPrice: null,
  checkOutOk: false,
  error: null
};

const ingredientsUpdate = (state, action) => {
  let newState, updatedState;

  newState = objDeepCopy(state);

  //TODO DEVELOPER: Make it cleaner.
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      newState.ingredients[action.payload.ingredientName] = newState.ingredients[action.payload.ingredientName] + 1;
      newState.totalPrice = newState.totalPrice + newState.ingredientsPrices[action.payload.ingredientName];
      updatedState = newState;
    break;
    case actionTypes.REMOVE_INGREDIENT:
      newState.ingredients[action.payload.ingredientName] = newState.ingredients[action.payload.ingredientName] - 1;
      newState.totalPrice = newState.totalPrice - newState.ingredientsPrices[action.payload.ingredientName];
      updatedState = newState;
    break;
    default:
      updatedState = state;
  }
  return updatedState;
};

const setIngredients = (state, {payload:{data}}) => {
  let newState, updatedState;

  newState = objDeepCopy(state);

  updatedState = {
    ...newState,
    ...data,
    error: null
  };

  return updatedState;
};

const fetchIngredientsFailed = (state, {payload:{message}}) => {
  let newState, updatedState;

  newState = objDeepCopy(state);

  updatedState = {
    ...newState,
    error: message
  };

  return updatedState;
};

const burgerBuilder = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return ingredientsUpdate(state, action);
    case actionTypes.REMOVE_INGREDIENT: return ingredientsUpdate(state, action);
    case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
    default: return state;
  }
};

export default burgerBuilder;
