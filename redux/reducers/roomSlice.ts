import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type initial = {
  room: IChatRoom | null;
};

const initialState: initial = { room: null };
export const roomSlice = createSlice({
  name: "room",
  initialState,

  reducers: {
    setCurrentRoom: (state, { payload }: PayloadAction<IChatRoom>) => {
      state.room = payload;
    },
  },
});
export const { setCurrentRoom } = roomSlice.actions;
export default roomSlice.reducer;
