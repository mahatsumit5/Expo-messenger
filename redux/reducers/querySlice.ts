import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Alert } from "react-native";

interface InitialState {
  numberOfPostToDisplay: number;
  numberOfMessageToDisplay: number;
  skipNumberOfMessages: number;
  searchQuery: string;
  pageForAllUsers: number;
}
const initialState: InitialState = {
  numberOfMessageToDisplay: 20,
  numberOfPostToDisplay: 10,
  skipNumberOfMessages: 0,
  searchQuery: "",
  pageForAllUsers: 1,
};
export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setSkipNumberOfMessages: (state, { payload }: PayloadAction<number>) => {
      state.skipNumberOfMessages = payload;
    },

    setPageForAllUsers: (
      state,
      { payload }: PayloadAction<{ numberOfpages: number }>
    ) => {
      console.log(payload);
      if (payload.numberOfpages === state.pageForAllUsers) {
        Alert.alert("info", "End reached remove later");
        return;
      }
      state.pageForAllUsers = state.pageForAllUsers + 1;
    },
  },
});
export default querySlice.reducer;
export const { setSkipNumberOfMessages, setPageForAllUsers } =
  querySlice.actions;
