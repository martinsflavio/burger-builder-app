import * as actionTypes from './actionTypes';
import axios from "../../utils/axiosAPI";

export const addIngredient = name => ({type: actionTypes.ADD_INGREDIENT, payload: {ingredientName: name}});

export const removeIngredient = name => ({type: actionTypes.REMOVE_INGREDIENT, payload: {ingredientName: name}});

export const setIngredients = data => ({type: actionTypes.SET_INGREDIENTS, payload: data});

export const fetchIngredientsFailed = error => ({type: actionTypes.FETCH_INGREDIENTS_FAILED, payload: error});

export const apiConnectionStatus = status => ({type: actionTypes.API_CONNECTION_STATUS, payload: status});

// Fetch data from API "Async Code"
export const fetchIngredients = () => {
  return async dispatch => {
    let initState;

    dispatch(apiConnectionStatus(true));
    initState = await axios.get('initialize.json');

    if (initState instanceof Error) {
      dispatch(fetchIngredientsFailed(initState));
    } else {
      dispatch(setIngredients(initState));
    }
    dispatch(apiConnectionStatus(false));
  }
};
