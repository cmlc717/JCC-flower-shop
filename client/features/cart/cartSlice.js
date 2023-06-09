import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/*
  CONSTANT VARIABLES
*/
const TOKEN = 'token';

/*
  THUNKS
*/
export const placeOrder = createAsyncThunk('placeOrder', async ({userId, productsArray, number, total, tax, date}) => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      const res = await axios.get(`/api/orders/orderMyCart/${userId}`, {productsArray, number, total, tax, date});
    } else {
      return {};
    }
  } catch (err) {
    if (err.response.data) {
      return thunkAPI.rejectWithValue(err.response.data);
    } else {
      return 'There was an issue with your request.';
    }
  }
});

export const saveOrder = createAsyncThunk('saveOrder', async ({userId, productsArray}) => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      const res = await axios.get(`/api/users/saveMyCart/${userId}`, productsArray);
      return res.data;
    } else {
      return [];
    }
  } catch (err) {
    if (err.response.data) {
      return thunkAPI.rejectWithValue(err.response.data);
    } else {
      return 'There was an issue with your request.';
    }
  }
});

export const getCart = createAsyncThunk('getCart', async (userId) => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      const res = await axios.get(`/api/users/getMyCart/${userId}`);
      return res.data;
    } else {
      return [];
    }
  } catch (err) {
    if (err.response.data) {
      return thunkAPI.rejectWithValue(err.response.data);
    } else {
      return 'There was an issue with your request.';
    }
  }
});

/*
  SLICE
*/
export const savedCart = createSlice({
  name: 'savedCart',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(saveOrder.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});


/*
  REDUCER
*/
export default savedCart.reducer;
