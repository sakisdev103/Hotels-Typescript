import { configureStore } from "@reduxjs/toolkit";

import citiesReducer from "./cities/citiesSlice";
import cityReducer from "./city/citySlice";
import dateReducer from "./dates/datesSlice";
import travelerRecuder from "./travelers/travelerSlice";
import hotelsReducer from "./hotel/hotelSlice";

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    city: cityReducer,
    dates: dateReducer,
    travelers: travelerRecuder,
    hotels: hotelsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
