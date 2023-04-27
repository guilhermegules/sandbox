import localStorageMiddleware from "../middlewares/local-storage-middleware.js";
import thunk from "../middlewares/thunk.js";
import user from "../reducers/user.reducer.js";
import token from "../reducers/token.reducer.js";

const reducer = Redux.combineReducers({ user, token });

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;

const enhancer = composeEnhancers(
  Redux.applyMiddleware(thunk),
  Redux.applyMiddleware(localStorageMiddleware)
);

const store = Redux.createStore(reducer, enhancer);

export default store;
