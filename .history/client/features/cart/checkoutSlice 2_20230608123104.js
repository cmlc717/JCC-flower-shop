import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    creditCard: {
      cardNumber: "",
      cardHolder: "",
      expirationDate: "",
      cvv: "",
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    updateCreditCard: (state, action) => {
      state.creditCard = action.payload;
    },
    startCheckout: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    checkoutSuccess: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    checkoutFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  updateCreditCard,
  startCheckout,
  checkoutSuccess,
  checkoutFailure,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;