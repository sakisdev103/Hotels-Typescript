import { customFetch } from "@/utils/customFetch";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  dest_id: null,
  dest_type: null,
  places: [],
  hotels: [],
};
const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {},
});

// export const getHotels = createAsyncThunk(
//   "getHotels",
//   async (location: string) => {
//     try {
//       const resp = await customFetch.get(
//         `/hotels/locations?locale=en-us&name=${location}`
//       );
//       console.log(resp);
//       return resp.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

export default hotelSlice.reducer;
