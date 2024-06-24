import { createSlice } from "@reduxjs/toolkit";

import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

const initialState: DateRange = {
  from: new Date(),
  to: addDays(new Date(), 4),
};

const datesSlice = createSlice({
  name: "dates",
  initialState,
  reducers: {
    updateDates: (state, action) => {
      state.from = action.payload.from;
      state.to = action.payload.to;
      console.log(action.payload);
    },
  },
});

export const { updateDates } = datesSlice.actions;

export default datesSlice.reducer;
