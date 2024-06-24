import { configureStore } from "@reduxjs/toolkit";

import citiesReducer from "./cities/citiesSlice";
import cityReducer from "./city/citySlice";
import travelerRecuder from "./travelers/travelerSlice";

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    city: cityReducer,
    travelers: travelerRecuder,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
