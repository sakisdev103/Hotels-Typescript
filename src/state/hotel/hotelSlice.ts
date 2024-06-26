import { customFetch } from "@/utils/customFetch";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type getHotelsState = {
  checkin_date: string;
  checkout_date: string;
  room_number: number;
  adults_number: number;
  dest_id: string;
};

const initialState = {
  loading: false,
  hotels: [],
};
const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHotels.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHotels.fulfilled, (state, action) => {
        state.hotels = action.payload;
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
  }: getHotelsState) => {
    try {
      const resp = await customFetch.get(
        `/hotels/search?checkin_date=${checkin_date}&checkout_date=${checkout_date}&room_number=${room_number}&adults_number=${adults_number}&dest_id=${dest_id}&order_by=popularity&dest_type=city&units=metric&filter_by_currency=EUR&locale=en-us&include_adjaceny=true`
      );
      console.log(resp.data.result);
      return resp.data.result;
    } catch (error) {
      console.log(error);
    }
  }
);

export default hotelSlice.reducer;
