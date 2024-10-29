import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}
interface IUser {
  id?: number;
  role?: UserRole;
  email?: string;
  url?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
}

export interface userInterface {
  user?: IUser | null;
}

const initialState: userInterface = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRemoveUser(state: userInterface) {
      state.user = null;
    },

    setUser(state: userInterface, action: PayloadAction<userInterface>) {
      const { user } = action.payload;
      if (user) {
        state.user = action.payload.user;
      } else {
        state.user = null;
      }
    },
  },
});

export const { reducer } = userSlice;

export const userSelector = (state: RootState) => state.user.user;

export const { setRemoveUser, setUser } = userSlice.actions;

export default userSlice;
