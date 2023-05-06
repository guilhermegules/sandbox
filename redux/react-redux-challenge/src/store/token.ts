import {
  CreateAsyncSliceAction,
  CreateAsyncSliceState,
} from "./models/create-async-slice.model";
import createAsyncSlice from "./utils/create-async-slice.utils";
import { getLocalStorage } from "./utils/get-local-storage.utils";

const TOKEN_API_URL = "https://dogsapi.origamid.dev/json/jwt-auth/v1/token";

const token = createAsyncSlice({
  name: "token",
  initialState: {
    data: {
      token: getLocalStorage("token"),
    },
  },
  reducers: {
    fetchSuccess: {
      reducer: (
        state: CreateAsyncSliceState,
        action: CreateAsyncSliceAction
      ) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      },
      prepare: (payload: any) => ({
        payload,
        error: null,
        meta: {
          localStorage: {
            key: "token",
            value: payload.token,
          },
        },
      }),
    },
  },
  fetchConfig: (payload: any) => ({
    url: TOKEN_API_URL,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  }),
});

export const fetchToken = token.asyncAction;

export default token.reducer;
