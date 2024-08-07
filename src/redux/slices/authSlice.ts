import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthInterface {
  token?: string | null;
  isAuthenticated?: boolean;
  isAuthInitialized?: boolean;
}

const initialState: AuthInterface = {
  token: null,
  isAuthenticated: false,
  isAuthInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogoutData(state: AuthInterface) {
      state.token = null;
      state.isAuthenticated = false;
    },

    setAuthInitialized(state: AuthInterface) {
      state.isAuthInitialized = true;
    },
    setCredentials(state: AuthInterface, action: PayloadAction<AuthInterface>) {
      const { token } = action.payload;
      if (token) {
        state.token = action.payload.token;
        state.isAuthenticated = true;
      } else {
        state.token = null;
        state.isAuthenticated = false;
      }
    },
  },
});

export const { reducer } = authSlice;

export const getAuth = (state: RootState) => state.auth;

export const { setLogoutData, setCredentials, setAuthInitialized } =
  authSlice.actions;

export default authSlice;
