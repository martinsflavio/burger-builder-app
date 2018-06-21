import { combineReducers } from "redux";
import burgerBuilder from "./burgerbuilderReducer";
import orders from "./orderReducer";
import apiConnection from "./apiConnectionReducer";
import auth from "./authReducer";


const rootReducer = combineReducers({
  burgerBuilder,
  orders,
  apiConnection,
  auth
});


export default rootReducer;