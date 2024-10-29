import { createSlice } from "@reduxjs/toolkit";

export interface SidebarInterface {
  isSidebarOpen: boolean;
}

const initialState: SidebarInterface = {
  isSidebarOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const sidebarReducer = sidebarSlice.reducer;
export const { toggleSidebar } = sidebarSlice.actions;
