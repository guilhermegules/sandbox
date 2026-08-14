const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  console.log(action);
  if (action.meta !== undefined) {
    window.localStorage(action.meta, action.payload);
  }
  return result;
};

export default localStorageMiddleware;
