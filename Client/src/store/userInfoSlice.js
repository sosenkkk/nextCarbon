import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../helper/helper";

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
      state.userCart= action.payload.userCart;
    },
    cart(state, action) {
      state.userCart = action.payload;
    },
  },
});

export const fetchUserData = (token) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(BASE_URL + "my-account", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      return data;
    };

    const data = await fetchData();
    const email = data.email;
    const firstName = data.firstName;
    const lastName = data.lastName;
    const userCart = data.cart;
    const user = { email, firstName, lastName, userCart };
    dispatch(info(user));
  };
};

export const { info, cart } = userInfoSlice.actions;

export default userInfoSlice.reducer;
