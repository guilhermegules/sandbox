import {
  userFetchError,
  userFetchStarted,
  userFetchSuccess,
} from "../reducers/user.reducer.js";

export const USER_API_URL = "https://dogsapi.origamid.dev/json/api/user";

export const fetchUser = (token) => {
  return async (dispatch) => {
    try {
      dispatch(userFetchStarted());
      const response = await fetch(USER_API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const payload = await response.json();
      dispatch(userFetchSuccess(payload));
    } catch (error) {
      dispatch(userFetchError(error));
    }
  };
};
