import { getLocalStorage } from "../utils/local-storage.helper.js";

const FETCH_STARTED = "token/FETCH_STARTED";
const FETCH_SUCCESS = "token/FETCH_SUCCESS";
const FETCH_ERROR = "token/FETCH_ERROR";

export const tokenFetchStarted = () => ({ type: FETCH_STARTED });
export const tokenFetchSuccess = (payload) => ({
  type: FETCH_SUCCESS,
  payload,
  meta: "token",
});
export const tokenFetchError = (payload) => ({ type: FETCH_ERROR, payload });

const initialState = {
  data: getLocalStorage("token", null),
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STARTED:
      return { ...state, loading: true, error: null, data: null };
    case FETCH_SUCCESS:
      return { ...state, loading: false, error: null, data: action.payload };
    case FETCH_ERROR:
      return { ...state, loading: true, error: action.payload, data: null };
    default:
      return state;
  }
};

export default reducer;
