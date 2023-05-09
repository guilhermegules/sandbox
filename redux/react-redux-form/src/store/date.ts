import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "date",
  initialState: {
    departure: "",
    return: "",
  },
  reducers: {
    addDates: (state, action) => {
      state.departure = action.payload.departure;
      state.return = action.payload.return;
    },
  },
});

export const { addDates } = slice.actions;

export default slice.reducer;
