import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userPersistence from "./middlewares/userPersistence";
import rootReducer from "./reducers/index";

const composeEnhancers = process.env.NODE_ENV === 'development' ?
                            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const middleware = applyMiddleware(thunk, userPersistence);

const store = createStore(rootReducer, composeEnhancers(middleware));

export default store;
