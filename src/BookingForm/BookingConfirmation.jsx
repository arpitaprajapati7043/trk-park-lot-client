import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';


const BookingConfirmation = () => {
  const navigate=useNavigate();
  const { state } = useLocation();
  const { bookingId } = state || {};  // Booking ID ko state se access karo
const handleTonavigate=()=>{
navigate('/parkinglots')
}
  return (
    <div className="confirmation-container">
      <h1>Booking successfull !!!</h1> 
      {bookingId ? (
         <strong>{bookingId}</strong>
      ) : (
        <p><button onClick={handleTonavigate}>Ok</button></p> 
      )}
    </div>
  );
};

export default BookingConfirmation;
