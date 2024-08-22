import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: {
  user: unknown;
  isLoggedIn: boolean;
} = { user: {}, isLoggedIn: false };
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      { payload }: PayloadAction<{ user: IUser; isLoggedIn: boolean }>
    ) => {
      state.user = payload.user;
      state.isLoggedIn = payload.isLoggedIn;
    },
  },
});

export default userSlice.reducer;

export const { setUser } = userSlice.actions;
