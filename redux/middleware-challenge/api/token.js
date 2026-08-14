import {
  tokenFetchError,
  tokenFetchStarted,
  tokenFetchSuccess,
} from "../reducers/token.reducer.js";

export const TOKEN_API_URL =
  "https://dogsapi.origamid.dev/json/jwt-auth/v1/token";

export const fetchToken = (user) => {
  return async (dispatch) => {
    try {
      dispatch(tokenFetchStarted());
      const response = await fetch(TOKEN_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const { token } = await response.json();
      dispatch(tokenFetchSuccess(token));
    } catch (error) {
      dispatch(tokenFetchError(error));
    }
  };
};
