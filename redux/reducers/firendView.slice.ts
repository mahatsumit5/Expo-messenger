import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type view = "row" | "card";
const initialState: {
  view: view;
} = { view: "card" };
const viewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setView: (state, { payload }: PayloadAction<view>) => {
      state.view = payload;
    },
  },
});

export default viewSlice.reducer;

export const { setView } = viewSlice.actions;
