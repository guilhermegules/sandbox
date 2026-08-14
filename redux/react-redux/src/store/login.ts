import { ThunkDispatch, combineReducers } from "@reduxjs/toolkit";
import createAsyncSlice from "./utils/create-async-slice";
import { User } from "../models/user.model";
import { getLocalStorage } from "./utils/get-local-storage";

const token = createAsyncSlice({
  name: "token",
  initialState: {
    data: {
      token: getLocalStorage("token"),
    },
  },
  reducers: {
    fetchSuccess: {
      reducer: (state: any, action: any) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      },
      prepare: (payload: any) => {
        return {
          payload,
          error: null,
          meta: {
            localStorage: {
              key: "token",
              value: payload.token,
            },
          },
        };
      },
    },
  },
  fetchConfig: (payload) => ({
    url: "https://dogsapi.origamid.dev/json/jwt-auth/v1/token",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  }),
});

const user = createAsyncSlice({
  name: "user",
  fetchConfig: (payload) => ({
    url: "https://dogsapi.origamid.dev/json/api/user",
    options: {
      method: "GET",
      headers: {
        Authorization: `Bearer ${payload}`,
      },
    },
  }),
});

const reducer = combineReducers({ token: token.reducer, user: user.reducer });

const fetchToken = token.asyncAction;
const fetchUser = user.asyncAction;

export const login =
  (user: User) => async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      const { payload } = await dispatch(fetchToken(user));
      if (payload.token !== undefined) await dispatch(fetchUser(payload.token));
    } catch (error) {
      console.log(error);
    }
  };

export const autoLogin =
  () => async (dispatch: ThunkDispatch<any, any, any>, getState: () => any) => {
    const state = getState();
    const { token } = state.login.token.data;
    if (token) {
      await dispatch(fetchUser(token));
    }
  };

export default reducer;
