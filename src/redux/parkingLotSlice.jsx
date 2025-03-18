// parkingLotSlice.js (Redux Slice)

import { createSlice } from '@reduxjs/toolkit';
import { fetchAllParkingLots } from '../redux/serviceApi';


const initialState = {
  parkingLotData: [],

  status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  error: null
};

const parkingLotSlice = createSlice({
  name: 'parkinglots',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllParkingLots.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllParkingLots.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.parkingLotData = action.payload; 
     
      })
      .addCase(fetchAllParkingLots.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default parkingLotSlice.reducer;
