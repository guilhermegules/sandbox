export const getLocalStorage = (key: string, initialValue: unknown = null) => {
  const localStorageValue = window.localStorage.getItem(key);
  if (localStorageValue) {
    return JSON.parse(localStorageValue);
  }

  return initialValue;
};
