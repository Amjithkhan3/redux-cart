import { createSlice } from "@reduxjs/toolkit";

// Load wishlist from localStorage
const savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: savedWishlist,

  reducers: {
    addToWishlist: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state));
    },

    removeWishlistItem: (state, action) => {
      const updated = state.filter(item => item.id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return updated;
    },
  },
});

export const { addToWishlist, removeWishlistItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;
