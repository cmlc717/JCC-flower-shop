import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/*
  CONSTANT VARIABLES
*/
const TOKEN = 'token';

/*
  THUNKS
*/
export const fetchOrderDetails = createAsyncThunk('orderDetails', async (orderId) => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      const res = await axios.get(`/api/orders/orderDetails/${orderId}`);
      console.log(res.data)
      return res.data;
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

/*
  SLICE
*/
export const OrderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrderDetails.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});


/*
  REDUCER
*/
export default OrderDetailsSlice.reducer;