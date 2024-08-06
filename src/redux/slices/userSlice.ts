import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IUser {
  full_name: string;
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  verified: boolean;
  added_by_admin: boolean;
  status: string;
  reset_pass_token: string;
  role: string;
  last_active_date: string | Date;
  created_at: string | Date;
  updated_at: string | Date;
  deleted_at: string | Date;
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

export const getAuth = (state: RootState) => state.user;

export const { setRemoveUser, setUser } = userSlice.actions;

export default userSlice;
