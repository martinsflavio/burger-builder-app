import * as actionTypes from '../actions/actionTypes';
import objDeepCopy from '../../utils/objDeepCopy';

export const initialState = {
  ingredients: null,
  ingredientsPrices: null,
  totalPrice: null,
  loading: true,
  error: null
};

// Out sourced reducer's logic
const ingredientsUpdate = (state, action) => {
  let newState, updatedState;

  newState = objDeepCopy(state);

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

const setIngredients = (state, action) => {
  let newState, updatedState;

  newState = objDeepCopy(state);

  updatedState = {
    ...newState,
    ...action.payload.data,
    loading: false
  };

  return updatedState;
};

const fetchIngredientsFailed = (state, action) => {
  let newState, updatedState;

  newState = objDeepCopy(state);

  updatedState = {
    ...newState,
    error: action.payload.message,
    loading: false
  };

  return updatedState;
};

// Reducer
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
