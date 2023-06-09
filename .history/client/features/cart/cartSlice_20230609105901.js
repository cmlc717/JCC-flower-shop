import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
  }
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;