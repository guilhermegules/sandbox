import { ThunkDispatch, createSlice } from "@reduxjs/toolkit";
import { CreateAsyncSliceConfig } from "../../models/create-async-slice.model";

/**
 * Creates an slice with async function
 * @param config configuration of slice, type CreateAsyncSliceConfig
 * @param config.name name of the slice
 * @param config.initialState __optional__ set the initial state of the slice
 * @param config.reducers __optional__ set the object of reducers of the slice
 * @param config.fetchConfig function to return the url and options of fetch call
 */
const createAsyncSlice = (config: CreateAsyncSliceConfig) => {
  const slice = createSlice({
    name: config.name,
    initialState: {
      loading: false,
      data: null,
      error: null,
      ...config.initialState,
    },
    reducers: {
      fetchStarted: (state) => {
        state.loading = true;
      },
      fetchSuccess: (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload;
      },
      fetchError: (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = null;
      },
      ...config.reducers,
    },
  });

  const { fetchError, fetchStarted, fetchSuccess } = slice.actions;

  const asyncAction =
    (payload: unknown) =>
    async (dispatch: ThunkDispatch<unknown, unknown, any>) => {
      try {
        dispatch(fetchStarted());
        const { url, options } = config.fetchConfig(payload);
        const response = await fetch(url, options);
        const data = await response.json();
        return dispatch(fetchSuccess(data));
      } catch (error) {
        return dispatch(fetchError(error));
      }
    };

  return { ...slice, asyncAction };
};

export default createAsyncSlice;
