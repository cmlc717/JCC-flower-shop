import { configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import cartReducer from "../features/cart/cartSlice";
import orderHistoryReducer from '../features/orderHistory/OrderHistorySlice';
import productsReducer, { removeFromStorage } from '../features/products/ProductSlice';
import orderDetailsReducer from '../features/orderHistory/OrderDetailsSlice';
import checkoutSlice from '../features/cart/checkoutSlice';



const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    orderHistory: orderHistoryReducer,
    products: productsReducer,
    orderDetails: orderDetailsReducer,
    checkout: checkoutSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
export { removeProductFromStorage };