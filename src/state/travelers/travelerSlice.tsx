import { createSlice } from "@reduxjs/toolkit";

type state = {
  room_number: number;
  adults_number: number;
};

const initialState: state = {
  room_number: 1,
  adults_number: 2,
};

const travelerSlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    increase: (state) => {
      if (state.adults_number < 14) {
        state.adults_number += 1;
      }
    },
    decrease: (state) => {
      if (state.adults_number > 1) {
        state.adults_number -= 1;
      }
    },
  },
});

export const { increase, decrease } = travelerSlice.actions;
export default travelerSlice.reducer;
