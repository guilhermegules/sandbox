const getLocalStorage = (key, initialValue) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    return initialValue;
  }
};

const initialState = {
  loading: false,
  data: getLocalStorage("data", null),
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_STARTED":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload, error: null };
    case "FETCH_ERROR":
      return { ...state, loading: false, data: null, error: action.payload };
    default:
      return state;
  }
};

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;

const thunk = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch);
  }
  return next(action);
};

const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.localStorage !== undefined) {
    localStorage.setItem(action.localStorage, JSON.stringify(action.payload));
  }
  return result;
};

const enhancer = composeEnhancers(
  Redux.applyMiddleware(thunk),
  Redux.applyMiddleware(localStorageMiddleware)
);

const store = Redux.createStore(reducer, enhancer);

// Action creator, returns a function instead of an object
function fetchUrl(url) {
  return async (dispatch) => {
    try {
      dispatch({ type: "FETCH_STARTED" });
      const payload = await fetch(url).then((r) => r.json());
      dispatch({ type: "FETCH_SUCCESS", payload, localStorage: "data" });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error.message });
    }
  };
}

const state = store.getState();
if (state.data === null) {
  store.dispatch(fetchUrl("https://dogsapi.origamid.dev/json/api/photo"));
}
