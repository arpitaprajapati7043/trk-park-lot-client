import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://trk-park-lot-server.onrender.com/', // Backend URL
  withCredentials: true, // Allow cookies to be sent with the request
});

// Endpoints object to manage API URLs
const ENDPOINTS = {
  PARKING_SPOT: 'api/all',
  VIEW_SPOTBY_ID: (spotId) => `api/spot/${spotId}`,
  BOOK_SPOTBY_ID: (spotId) => `api/bookSpot/${spotId}`,
  AVAILABLE_SPOT_COUNT:'api/spots/availableSpot',
};



// Thunk to fetch parking lots data from the API
export const fetchAllParkingLots = createAsyncThunk('parkingLots/fetchAllParkingLots', async () => {
  const response = await instance.get(ENDPOINTS.PARKING_SPOT); // API request
  return response.data; // We only need the data part from the API response
});


// Async thunk to handle the booking API call
// export const bookSpot = createAsyncThunk(
//   'spotBooking/bookSpot',
//   async ({ spotId, trailerNumber, driverDetails, trailerStatus }, { rejectWithValue }) => {
//     try {
//       const response = await instance.post(ENDPOINTS.BOOK_SPOTBY_ID(spotId), {
//         trailerNumber,
//         driverDetails,
//         trailerStatus,
//       });
//       return response.data;
//          // Booking ID returned from API
//     } catch (error) {
//       return rejectWithValue(error.response.data.message || 'Booking failed');
//     }
//   }
// );

// bookSpot action (thunk)
export const bookSpot = createAsyncThunk(
  'spotBooking/bookSpot',
  async ({ spotId, trailerNumber, driverDetails, trailerStatus }, { rejectWithValue }) => {
    try {
      const response = await instance.post(ENDPOINTS.BOOK_SPOTBY_ID(spotId), {
        trailerNumber,
        driverDetails,
        trailerStatus,
      });

      // Assuming the API response contains the bookingId
      return response.data.bookingId; // You can adjust based on the structure of your response
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Booking failed');
    }
  }
);


export const confirmBooking = createAsyncThunk(
  'spotBooking/confirmBooking',
  async ({ spotId, trailerNumber, driverDetails, trailerStatus }, { rejectWithValue }) => {
    try {
      // Make the API call
      const response = await instance.post(ENDPOINTS.BOOK_SPOTBY_ID(spotId), {
        spotId,
        trailerNumber,
        driverDetails,
        trailerStatus,
      });

      console.log("confirmBooking response:", response.data);

      // Return complete response data for Redux to handle message, success, and bookingId
      return {
        message: response.data.message,
        success: response.data.success,
        bookingId: response.data.bookingId,
      };
    } catch (error) {
      console.error("Error in confirmBooking:", error);
      // Reject with the error message
      return rejectWithValue({
        message: error.response?.data?.message || 'Error occurred while booking.',
        success: false,
      });
    }
  }
);

export const fetchAvailableSpots = createAsyncThunk(
  'availableSpot/fetchAvailableSpots',
  async () => {
    const response = await instance.get(ENDPOINTS.AVAILABLE_SPOT_COUNT);
  return response.data; 
  }
);
