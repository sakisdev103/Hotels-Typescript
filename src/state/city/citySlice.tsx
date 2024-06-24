import { customFetch } from "@/utils/customFetch";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type state = {
  selectedCity: string;
  dest_id: string;
};

const initialState: state = {
  selectedCity: "",
  dest_id: "",
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCity.fulfilled, (state, action) => {
      state.selectedCity = action.payload[0].label;
      state.dest_id = action.payload[0].dest_id;
    });
  },
});

export const getCity = createAsyncThunk("getCity", async (city: string) => {
  try {
    const resp = await customFetch.get(
      `hotels/locations?locale=en-us&name=${city}`
    );
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
  }
});

export default citySlice.reducer;
