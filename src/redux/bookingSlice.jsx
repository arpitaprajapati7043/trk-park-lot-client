import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { bookSpot,confirmBooking} from './serviceApi';
// Slice for spot booking
const bookingSlice = createSlice({
  name: 'spotBooking',
  initialState: {
    status: 'idle',  // idle | loading | succeeded | failed
    error: null,
    bookingData: null,
    bookingId: null,
    message: null, // To store message from backend (success or error)
    success: null,
  },
  reducers: {
    clearBookingState: (state) => {
      state.status = 'idle';
      state.error = null;
      state.bookingData = null;
      state.bookingId = null;  // Reset bookingId on clear
      state.message = null; // Reset message
      state.success = null; 
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookSpot.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(bookSpot.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // state.bookingData = action.payload;
        state.bookingId = action.payload; 
        state.message = action.payload.message;  // Save message (success or error) from backend
        state.success = action.payload.success;
      })
      .addCase(bookSpot.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(confirmBooking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(confirmBooking.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log("confirmBooking.fulfilled - Action Payload:", action.payload); // Log to check the payload

        // Check if payload contains 'message' and 'success'
        if (action.payload.message && action.payload.success !== undefined) {
          state.message = action.payload.message;  // Save message
          state.success = action.payload.success;  // Save success
        } else {
          console.error("Invalid payload:", action.payload);
        }

        state.bookingId = action.payload.bookingId;  // Save booking ID
      })
      .addCase(confirmBooking.rejected, (state, action) => {
        state.status = 'failed';
        console.log("confirmBooking.rejected - Action Payload:", action.payload);  // Log to check error payload
        state.error = action.payload.error; // Save error message
        state.message = action.payload.message;  // Save error message
        state.success = false;  // If error occurs, set success as false
      });
  },
});

// Export actions
export const { clearBookingState } = bookingSlice.actions;

// Export the reducer
export default bookingSlice.reducer;
