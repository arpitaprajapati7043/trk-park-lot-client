import { configureStore } from '@reduxjs/toolkit';
import parkingLotReducer from '../redux/parkingLotSlice';
import bookingReducer from '../redux/bookingSlice';
import availableSpotReducer from '../redux/availableSpotSlice';
const store = configureStore({
  reducer: {
   parkinglots:parkingLotReducer,
   spotBooking:bookingReducer,
   availableSpot: availableSpotReducer
  },
});

export default store;
