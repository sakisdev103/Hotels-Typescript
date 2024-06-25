import { customFetch } from "@/utils/customFetch";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  hotels: [],
};
const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {},
});

export const getHotels = createAsyncThunk(
  "getHotels",
  async (location: string) => {
    try {
      const resp = await customFetch.get(`/hotels/search?`);
      console.log(resp);
      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export default hotelSlice.reducer;
