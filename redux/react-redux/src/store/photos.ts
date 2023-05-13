import createAsyncSlice from "./utils/create-async-slice";

const slice = createAsyncSlice({
  name: "photos",
  fetchConfig: () => ({
    url: "https://dogsapi.origamid.dev/json/api/photo/?_page=1&_total=10&_user=0",
    options: {
      method: "GET",
      cache: "no-store",
    },
  }),
});

export const getOverFiveKg = (state: any) =>
  state.photos.data?.filter(({ peso }: { peso: number }) => peso >= 5);

export const getDogDataWithPounds = (state: any) =>
  getOverFiveKg(state)?.map((s: any) => ({
    ...s,
    peso: Math.floor(s.peso * 2.2),
  }));

export const fetchPhotos = slice.asyncAction;

export default slice.reducer;
