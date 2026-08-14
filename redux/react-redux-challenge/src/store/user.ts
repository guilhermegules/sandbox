import { ThunkDispatch } from "@reduxjs/toolkit";
import createAsyncSlice from "./utils/create-async-slice.utils";
import { User } from "./models/user.model";
import { fetchToken } from "./token";

const USER_API_URL = "https://dogsapi.origamid.dev/json/api/user";

const user = createAsyncSlice({
  name: "user",
  fetchConfig: (payload) => ({
    url: USER_API_URL,
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${payload}`,
      },
    },
  }),
});

const fetchUser = user.asyncAction;

export const login =
  (user: User) => async (dispatch: ThunkDispatch<unknown, unknown, any>) => {
    try {
      const payload = await dispatch(fetchToken(user));
      if (payload.token !== undefined) await dispatch(fetchUser(payload.token));
    } catch (error) {
      console.log(error);
    }
  };

export const autoLogin =
  () => async (dispatch: ThunkDispatch<any, any, any>, getState: () => any) => {
    const state = getState();
    const { token } = state.login.token.data;
    if (!token) return;
    await dispatch(fetchUser(token));
  };

export default user.reducer;
