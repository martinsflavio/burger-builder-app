import { combineReducers } from 'redux';
import burgerBuilder from './burgerbuilderReducer';
import order from './orderReducer';


const rootReducer = combineReducers({
  burgerBuilder,
  order
});


export default rootReducer;