import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAvailableSpots } from './serviceApi';

const availableSpotSlice = createSlice({
  name: 'availableSpot',
  initialState: {
    availableCount: 0,
    spotsDetails: [],  
    status: 'idle',  // 'idle', 'loading', 'succeeded', 'failed'
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableSpots.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAvailableSpots.fulfilled, (state, action) => {
        state.status = 'succeeded';
       
        state.availableCount = action.payload.availableCount;  // Set available spots count
        state.spotsDetails = action.payload.spotsDetails || [];  
      })
      .addCase(fetchAvailableSpots.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default availableSpotSlice.reducer;
