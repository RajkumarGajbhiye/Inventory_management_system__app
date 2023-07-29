import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refresh: false,
  admin: {},
  opendrawer: true,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    refreshComponent: (state) => {
      state.refresh = !state.refresh;
    },
    manageAdmin: (state, action) => {
      state.admin = action.payload;
    },
    updateDrawer: (state) => {
      state.opendrawer = state.opendrawer;
    },
  },
});

export const { refreshComponent, manageAdmin, updateDrawer } =
  productSlice.actions;
export default productSlice.reducer;
