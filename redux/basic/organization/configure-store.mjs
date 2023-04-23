import counter from "./counter.mjs";

const reducer = Redux.combineReducers({ counter });

const store = Redux.createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
