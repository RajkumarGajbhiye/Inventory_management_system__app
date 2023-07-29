import { configureStore } from "@reduxjs/toolkit";
import products from "../slice/InveSlice";
export const store = configureStore({
  reducer: {
    products,
  },
});
