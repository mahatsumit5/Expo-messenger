import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  numberOfPostToDisplay: number;
  numberOfMessageToDisplay: number;
  skipNumberOfMessages: number;
  searchQuery: string;
  pageForAllUsers: number;
  takeNumberOfPeopleToDisplay: number;
  totalNumberOfUsers: number;
  order: "asc" | "desc";
}
const initialState: InitialState = {
  numberOfMessageToDisplay: 20,
  numberOfPostToDisplay: 10,
  skipNumberOfMessages: 0,
  searchQuery: "",
  pageForAllUsers: 1,
  takeNumberOfPeopleToDisplay: 5,
  totalNumberOfUsers: 0,
  order: "asc",
};
export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setSkipNumberOfMessages: (state, { payload }: PayloadAction<number>) => {
      state.skipNumberOfMessages = payload;
    },

    setPageForAllUsers: (state, { payload }: PayloadAction<number>) => {
      state.pageForAllUsers = payload;
    },

    setTotalNumberOfUsers: (state, { payload }: PayloadAction<number>) => {
      state.totalNumberOfUsers = payload;
    },
    setOrder: (
      state,
      { payload }: PayloadAction<(typeof initialState)["order"]>
    ) => {
      state.order = payload;
    },
  },
});
export default querySlice.reducer;
export const {
  setOrder,
  setSkipNumberOfMessages,
  setPageForAllUsers,
  setTotalNumberOfUsers,
} = querySlice.actions;
