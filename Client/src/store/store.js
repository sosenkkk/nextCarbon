import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { createWrapper } from "next-redux-wrapper";
import { userInfoSlice } from "./userInfoSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [userInfoSlice.name]: userInfoSlice.reducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);
