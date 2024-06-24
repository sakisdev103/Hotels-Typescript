import { customFetch } from "@/utils/customFetch";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type state = {
  allCities: [];
};

const initialState: state = {
  allCities: [],
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCities.fulfilled, (state, action) => {
      state.allCities = action.payload;
    });
  },
});

export const getAllCities = createAsyncThunk(
  "getAllCities",
  async (city: string) => {
    try {
      const resp = await customFetch.get(`/static/cities?name=${city}`);
      console.log(resp.data.result);
      return resp.data.result;
    } catch (error) {
      console.log(error);
    }
  }
);

export default citiesSlice.reducer;
