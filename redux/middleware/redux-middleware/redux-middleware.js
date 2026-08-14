const reducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;

const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("ACTION", action);
  console.log("OLD STATE", store.getState());
  const result = next(action);
  console.log("STATE", store.getState());
  console.groupEnd(action.type);
  return result;
};

const test = (store) => (next) => (action) => {
  if (action.type === "DECREMENT") alert("Decrement");
  return next(action);
};

const enhancer = composeEnhancers(
  Redux.applyMiddleware(logger),
  Redux.applyMiddleware(test)
);

const store = Redux.createStore(reducer, enhancer);

store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
