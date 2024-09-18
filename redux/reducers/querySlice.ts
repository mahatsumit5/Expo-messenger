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
  postCreatorUserId: string;
  pageForChatRoom: number;
  pageForHomePage: number;
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
  postCreatorUserId: "",
  pageForChatRoom: 1,
  pageForHomePage: 1,
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
    setPostCreatorUserId: (state, { payload }: PayloadAction<string>) => {
      state.postCreatorUserId = payload;
    },
    setOrder: (
      state,
      { payload }: PayloadAction<(typeof initialState)["order"]>
    ) => {
      state.order = payload;
    },
    setQuery: (state, { payload }: PayloadAction<string>) => {
      state.searchQuery = payload;
    },
    setPageForChatRoom(state, { payload }: PayloadAction<number>) {
      state.pageForChatRoom = payload;
    },
  },
});
export default querySlice.reducer;
export const {
  setPageForChatRoom,
  setOrder,
  setSkipNumberOfMessages,
  setPageForAllUsers,
  setTotalNumberOfUsers,
  setPostCreatorUserId,
  setQuery,
} = querySlice.actions;
