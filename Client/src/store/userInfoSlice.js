import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
  userCart: [],
};

export const userInfoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    info(state, action) {
      state.userInfo = action.payload;
      console.log(state.userInfo)
    },
    cart(state, action) {
      state.userCart = action.payload;
    },
  },
});



export const { info, cart } = userInfoSlice.actions;

export default userInfoSlice.reducer;
