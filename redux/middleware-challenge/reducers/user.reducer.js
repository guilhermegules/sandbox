const FETCH_STARTED = "user/FETCH_STARTED";
const FETCH_SUCCESS = "user/FETCH_SUCCESS";
const FETCH_ERROR = "user/FETCH_ERROR";

export const userFetchStarted = () => ({ type: FETCH_STARTED });
export const userFetchSuccess = (payload) => ({ type: FETCH_SUCCESS, payload });
export const userFetchError = (payload) => ({ type: FETCH_ERROR, payload });

const initialState = {
  loading: false,
  data: {
    username: null,
    password: null,
  },
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STARTED:
      return { ...state, loading: true, data: initialState, error: null };
    case FETCH_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null };
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        data: initialState,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
