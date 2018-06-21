import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import userPersistence from "./middlewares/userPersistence";
import rootReducer from "./reducers/index";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunk, userPersistence, logger);

const store = createStore(rootReducer, composeEnhancers(middleware));

export default store;
