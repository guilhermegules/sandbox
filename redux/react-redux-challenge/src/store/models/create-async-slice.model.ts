export type CreateAsyncSliceConfig = {
  name: string;
  fetchConfig: (payload: unknown) => FetchConfigValue;
  initialState?: Record<string, any>;
  reducers?: Record<string, any>;
};

export type FetchConfigValue = {
  url: string;
  options: any;
};

export type CreateAsyncSliceState = {
  loading: boolean;
  error: any | null;
  data: unknown | null;
};

export type CreateAsyncSliceAction = {
  payload: unknown;
  type: string;
};

export type CreateAsyncReducerFunction = (
  state: any,
  action: CreateAsyncReducerAction
) => any;

export type CreateAsyncReducerAction = {
  type: string;
  payload: any;
  meta: any;
};
