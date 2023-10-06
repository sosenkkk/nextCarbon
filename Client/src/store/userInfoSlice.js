import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../helper/helper";

const initialState = {
  userInfo: {},
  userCart: [],
  total:{}
};

export const userInfoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    info(state, action) {
      state.userInfo = action.payload;
    },
    cart(state, action) {
      state.userCart = action.payload;
    },
    total(state, action){
      state.total = action.payload;
    }
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
    const profile = data.profile;
    const user = { email, firstName, lastName, userCart, profile };
    dispatch(info(user));
  };
};

export const fetchUserCart = (token) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(BASE_URL + "cart", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      return data;
    };
    const data = await fetchData();
    dispatch(cart(data.products));
  };
};

export const fetchUserTotal = (token) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const result = await fetch(BASE_URL + "total", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const res = await result.json();
      const data = {totalPrice:res.totalPrice, totalQuantity :res.totalQuantity}
      return data;
    };
    const data = await fetchData();
    await dispatch(total(data));

  };
};

export const { info, cart, total } = userInfoSlice.actions;

export default userInfoSlice.reducer;
