import * as actionTypes from './actionTypes';
import axios from "../../utils/axiosAPI";

export const addIngredient = name => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: {
      ingredientName: name
    }
  }
};

export const removeIngredient = name => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: {
      ingredientName: name
    }
  }
};

export const setIngredients = data => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    payload: data
  }
};

export const fetchIngredientsFailed = error => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
    payload: error
  }
};

// Fetch data from API "Async Code"
export const fetchIngredients = () => {
  return async dispatch => {
    let initState;

    initState = await axios.get('initialize.json');

    if (initState instanceof Error) {
      dispatch(fetchIngredientsFailed(initState));
    } else {
      dispatch(setIngredients(initState));
    }
  }
};
