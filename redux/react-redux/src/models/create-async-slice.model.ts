export type CreateAsyncSliceConfig = {
  name: string;
  fetchConfig: (payload: unknown) => { url: string; options: any };
  initialState?: Record<string, any>;
  reducers?: Record<string, any>;
};
