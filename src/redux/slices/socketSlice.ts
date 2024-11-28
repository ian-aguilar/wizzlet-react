import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

export interface SocketState {
  // Export the interface
  socket: Socket | null;
}

const initialState: SocketState = {
  socket: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<Socket | any>) => {
      state.socket = action.payload;
    },
  },
});

// Selector to get the socket from the state
export const selectSocket = (state: { socket: SocketState }) =>
  state.socket.socket;

export const { reducer } = socketSlice;

export const { setSocket } = socketSlice.actions;

export default socketSlice;
