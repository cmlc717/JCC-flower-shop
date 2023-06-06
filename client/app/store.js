import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import orderHistoryReducer from '../features/orderHistory/OrderHistorySlice';

const store = configureStore({
  reducer: { 
    auth: authReducer,
    orderHistory: orderHistoryReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
