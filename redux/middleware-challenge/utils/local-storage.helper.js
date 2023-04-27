export const getLocalStorage = (key, defaultValue = null) => {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (err) {
    return defaultValue;
  }
};
