import { configureStore } from "@reduxjs/toolkit";
import auditSlice from "./auditSlice";
import restroSlice from "./restroSlice";

export const store = configureStore({
  reducer: {
    restaurant: restroSlice,
    audit: auditSlice
  },
});
