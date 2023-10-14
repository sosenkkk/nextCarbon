import { createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../helper/helper";

const initialState = {
  productModels: [],
  productPage: 1,
  productFilter: " ",
  productSort: " ",
  totalProductPages: 0,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setTotalProductPages(state, action) {
      state.totalProductPages = action.payload;
    },
    setTotalProductModels(state, action) {
      state.productModels = action.payload;
    },
    setFilter(state, action) {
      state.productFilter = action.payload;
    },
    setSort(state, action) {
        state.productSort = action.payload;
      },
    setProductPage(state, action) {
      state.productPage = action.payload;
    },
  },
});

export const fetchProductModels = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(BASE_URL + "total-products");
      const data = await response.json();
      return data;
    };

    const data = await fetchData();
    dispatch(setTotalProductModels(data.totalProductModels));
  };
};


export const { setTotalProductModels, setTotalProductPages, setFilter, setProductPage, setSort } = productSlice.actions;

export default productSlice.reducer;
