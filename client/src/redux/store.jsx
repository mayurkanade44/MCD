import { configureStore } from "@reduxjs/toolkit";
import restroSlice from "./restroSlice";

export const store = configureStore({
  reducer: {
    restaurant: restroSlice,
  },
});
