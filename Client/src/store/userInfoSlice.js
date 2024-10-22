import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../helper/helper";

const initialState = {
  userInfo: {},
  userCart: [],
  total:{},
  isAdmin:false,
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
    },
    userIsAdmin(state, action){
      state.isAdmin= action.payload;
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
        credentials:"include"
      });
      const data = await response.json();
      return data;
    };

    const data = await fetchData();
    const isAdmin = data.isAdmin;
    dispatch(userIsAdmin(isAdmin))
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
        credentials:"include"
      });
      const data = await response.json();
      return data;
    };
    const data = await fetchData();
    dispatch(cart(data.products));
    dispatch(total(data.total))
  };
};


export const { info, cart, total, userIsAdmin } = userInfoSlice.actions;

export default userInfoSlice.reducer;
