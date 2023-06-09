import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import cartReducer, { placeOrder } from "../features/cart/cartSlice";
import orderHistoryReducer from '../features/orderHistory/OrderHistorySlice';
import productsReducer from '../features/products/ProductSlice';
import orderDetailsReducer from '../features/orderHistory/OrderDetailsSlice';
import checkoutSlice from '../features/cart/checkoutSlice';
import savedCartReducer from '../features/cart/cartSlice';

const middleware = [...getDefaultMiddleware(), logger];

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    orderHistory: orderHistoryReducer,
    products: productsReducer,
    orderDetails: orderDetailsReducer,
    checkout: checkoutSlice,
    savedCart: savedCartReducer
  },
  middleware: middleware,
});

export default store;
export * from '../features/auth/authSlice';