import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetStateAction } from "react";
interface InitialState {
  numberOfPostToDisplay: number;

  //   number of messages is static to 10 for now. Could be helpful to change if need to change any feature
  numberOfMessageToDisplay: number;
  skipNumberOfMessages: number;
}
const initialState: InitialState = {
  numberOfMessageToDisplay: 20,
  numberOfPostToDisplay: 10,
  //   inital skip is 0
  skipNumberOfMessages: 0,
};
export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setSkipNumberOfMessages: (state, { payload }: PayloadAction<number>) => {
      state.skipNumberOfMessages = payload;
    },
  },
});
export default querySlice.reducer;
export const { setSkipNumberOfMessages } = querySlice.actions;
