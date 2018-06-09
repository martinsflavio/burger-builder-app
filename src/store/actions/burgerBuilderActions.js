import * as actionTypes from './actionTypes';
import axios from "../../utils/axiosAPI";
import { apiConnectionStatus } from './apiConnectionActions';

export const addIngredient = name => ({type: actionTypes.ADD_INGREDIENT, payload: {ingredientName: name}});

export const removeIngredient = name => ({type: actionTypes.REMOVE_INGREDIENT, payload: {ingredientName: name}});

export const setIngredients = data => ({type: actionTypes.SET_INGREDIENTS, payload: data});

export const fetchIngredientsFailed = error => ({type: actionTypes.FETCH_INGREDIENTS_FAILED, payload: error});

// Fetch data from API "Async Code"
export const fetchIngredients = () => {
  return dispatch => {

    dispatch(apiConnectionStatus(true));
    axios.get('initialize.json')
      .then(res => {
        dispatch(setIngredients(res));
        dispatch(apiConnectionStatus(false));
      }).catch(error => {
      dispatch(fetchIngredientsFailed(error));
      dispatch(apiConnectionStatus(false));
    });
  }
};
