import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/*
  THUNKS
*/
export const fetchProductsAsync = createAsyncThunk('products', async () => {
  try {
    const res = await axios.get(`/api/products`);
    return res.data;
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
export const ProductsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});


/*
  REDUCER
*/
export default ProductsSlice.reducer;
