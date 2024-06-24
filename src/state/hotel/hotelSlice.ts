import { customFetch } from "@/utils/customFetch";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  places: [],
  hotels: [],
};
const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCities.fulfilled, (state, action) => {
      state.places = action.payload;
    });
  },
});

export const getAllCities = createAsyncThunk(
  "getAllCities",
  async (city: string) => {
    try {
      const resp = await customFetch.get(
        `https://booking-com.p.rapidapi.com/v1/static/cities?name=${city}`
      );
      console.log(resp.data.result);
      return resp.data.result;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchLocation = createAsyncThunk(
  "fetchLocation",
  async (location: string) => {
    try {
      const resp = await customFetch.get(
        `/locations?locale=en-us&name=${location}`
      );
      console.log(resp.data);

      return resp.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export default hotelSlice.reducer;
