import { combineReducers } from 'redux';
import burgerBuilder from './burgerbuilderReducer';
import orders from './orderReducer';


const rootReducer = combineReducers({
  burgerBuilder,
  orders
});


export default rootReducer;