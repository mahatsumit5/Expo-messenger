import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Socket, io } from "socket.io-client";
// "undefined" means the URL will be computed from the `window.location` object

type TinitialState = {
  isTyping: boolean;
  personTyping: string;
  socket: Socket | null;
};
const initialState: TinitialState = {
  isTyping: false,
  personTyping: "",
  socket: null,
};
const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setTyping(
      state,
      { payload }: PayloadAction<{ typing: boolean; person: string }>
    ) {
      state.isTyping = payload.typing;
      state.personTyping = payload.person;
    },
    setSocket: (state, { payload }: PayloadAction<Socket | any>) => {
      state.socket = payload;
    },
  },
});
export const { setTyping, setSocket } = socketSlice.actions;
export default socketSlice.reducer;
