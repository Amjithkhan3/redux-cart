import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: savedCart,

  reducers: {
    // Add item to cart
    addToCart: (state, action) => {
      const existingProduct = state.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
        existingProduct.totalPrice =
          existingProduct.quantity * existingProduct.price;
      } else {
        state.push({
          ...action.payload,
          quantity: 1,
          price: action.payload.price,
          totalPrice: action.payload.price,
        });
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    // Increase quantity
    incrementQty: (state, action) => {
      const item = state.find((p) => p.id === action.payload);
      if (item) {
        item.quantity += 1;
        item.totalPrice = item.quantity * item.price;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // Decrease quantity
    decrementQty: (state, action) => {
      const item = state.find((p) => p.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.totalPrice = item.quantity * item.price;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

    // Remove item
    removeFromCart: (state, action) => {
      const updated = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    },
  },
});

export const {
  addToCart,
  incrementQty,
  decrementQty,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
