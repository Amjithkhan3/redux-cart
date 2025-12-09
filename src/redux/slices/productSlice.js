import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// async thunk
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    const result = await axios.get("https://dummyjson.com/products");
    return result.data.products;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    loading: false,
    error: ""
  },

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.allProducts = [];
      state.loading = true;
      state.error = "";
    });

    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.allProducts = action.payload;
      state.loading = false;
      state.error = "";
    });

    builder.addCase(getAllProducts.rejected, (state) => {
      state.allProducts = [];
      state.loading = false;
      state.error = "Something went wrong!! API Call failed....";
    });
  },
});

export default productSlice.reducer;
