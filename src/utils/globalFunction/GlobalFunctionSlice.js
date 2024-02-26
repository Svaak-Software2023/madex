import { createSlice } from "@reduxjs/toolkit";

const GlobalFunctionSlice = createSlice({
  name: "Global Function",
  initialState: {
    isMenuOpen: false,
    restrictedMode: false,
  },
  reducers: {
    setmenu: (state, action) => {
      state.isMenuOpen = action.payload;
    },
    setRestrictedMode: (state) => {
      state.restrictedMode = !state.restrictedMode;
    },
  },
});

export const { setmenu, setRestrictedMode } = GlobalFunctionSlice.actions;
export default GlobalFunctionSlice.reducer;
