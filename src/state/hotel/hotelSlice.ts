import { customFetch } from "@/utils/customFetch";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type getHotelsState = {
  checkin_date: string;
  checkout_date: string;
  room_number: number;
  adults_number: number;
  dest_id: string;
  order_by: string;
};

const initialState = {
  loading: false,
  hotels: [],
  filters: [],
  filterOption: "",
};
const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    updateFilterOption: (state, action) => {
      state.filterOption = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHotels.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHotels.fulfilled, (state, action) => {
        state.hotels = action.payload.result;
        state.filters = action.payload.sort;
        state.loading = false;
      });
  },
});

export const getHotels = createAsyncThunk(
  "getHotels",
  async ({
    checkin_date,
    checkout_date,
    room_number,
    adults_number,
    dest_id,
    order_by,
  }: getHotelsState) => {
    try {
      const resp = await customFetch.get(
        `/hotels/search?checkin_date=${checkin_date}&checkout_date=${checkout_date}&room_number=${room_number}&adults_number=${adults_number}&dest_id=${dest_id}&order_by=${order_by}&dest_type=city&units=metric&filter_by_currency=EUR&locale=en-us&include_adjaceny=true`
      );
      // console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const { updateFilterOption } = hotelSlice.actions;

export default hotelSlice.reducer;
