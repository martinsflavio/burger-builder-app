import { combineReducers } from 'redux';
import burgerBuilder from './burgerbuilderReducer';
import orders from './orderReducer';
import apiConnection from './apiConnectionReducer';


const rootReducer = combineReducers({
  burgerBuilder,
  orders,
  apiConnection
});


export default rootReducer;