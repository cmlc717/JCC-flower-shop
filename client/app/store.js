import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import cartReducer from "../features/cart/cartSlice";
import orderHistoryReducer from '../features/orderHistory/OrderHistorySlice';
import productsReducer from '../features/products/ProductSlice';

const store = configureStore({
  reducer: { 
    auth: authReducer,
    cart: cartReducer,
    orderHistory: orderHistoryReducer,
    products: productsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../features/auth/authSlice";