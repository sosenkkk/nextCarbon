import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userToken: {},
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = action.payload;
    },
    userToken(state, action) {
      state.userToken = action.payload;
    },
  },
});
export const { login, userToken } = authSlice.actions;

export default authSlice.reducer;
