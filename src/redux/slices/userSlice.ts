import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IUserInitialRedux {
  token: null | string;
  user: any | null;
}

const initialState = {
  token: null,
  user: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: IUserInitialRedux, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setToken: (
      state: IUserInitialRedux,
      action: PayloadAction<string | null>
    ) => {
      state.token = action.payload;
    },
    removeToken: (state: IUserInitialRedux) => {
      state.token = null;
    },
  },
});

export const userSelector = (state: { user: IUserInitialRedux }) =>
  state.user.user;
export const tokenSelector = (state: { user: IUserInitialRedux }) =>
  state.user.token;

const { actions, reducer } = userSlice;

export const { setUser, setToken, removeToken } = actions;

export default reducer;
