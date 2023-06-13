import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/*
  CONSTANT VARIABLES
*/
const TOKEN = 'token';

/*
  THUNKS
*/
export const fetchUserDetails = createAsyncThunk('fetchUserDetails', async (userId) => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {      
      const res = await axios.get(`/api/users/${userId}`);
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

export const editUserDetails = createAsyncThunk('editUserDetails', async ({userId, username, password, email, address, cardNumber }) => {
    const token = window.localStorage.getItem(TOKEN);
    try {
      if (token) {      
        const res = await axios.put(`/api/users/${userId}`, {username, password, email, address, cardNumber });
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
export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
        return action.payload;
    });
    builder.addCase(editUserDetails.fulfilled, (state, action) => {
        return action.payload;
    });
  },
});


/*
  REDUCER
*/
export default userDetailsSlice.reducer;