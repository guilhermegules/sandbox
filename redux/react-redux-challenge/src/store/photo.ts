import createAsyncSlice from "./utils/create-async-slice.utils";

const PHOTO_API_URL = "https://dogsapi.origamid.dev/json/api/photo?_user=0";

const photo = createAsyncSlice({
  name: "photo",
  fetchConfig: (payload: any) => ({
    url: `${PHOTO_API_URL}&_page=${payload.page}&_total=${payload.total}`,
    options: {
      method: "GET",
      cache: "no-store",
    },
  }),
});

export const fetchPhoto = photo.asyncAction;

export default photo.reducer;
