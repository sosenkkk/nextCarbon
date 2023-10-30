import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { createWrapper } from "next-redux-wrapper";
import { userInfoSlice } from "./userInfoSlice";
import {productSlice} from "./productSlice";
export const makeStore = configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [userInfoSlice.name]: userInfoSlice.reducer,
      [productSlice.name]:productSlice.reducer,
    },
    devTools: true,
  });

// export const wrapper = createWrapper(makeStore);
