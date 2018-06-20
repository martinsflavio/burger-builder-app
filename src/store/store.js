import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { localStorageManager } from "../utils/localStorageManager";
import rootReducer from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = applyMiddleware(thunk, localStorageManager);

const store = createStore(rootReducer, composeEnhancers(middleware));

export default store;
