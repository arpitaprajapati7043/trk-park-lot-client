// // src/components/BookingForm.js
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { bookSpot } from '../redux/serviceApi';

// const BookingForm = () => {
//   const dispatch = useDispatch();
//   const { loading, message, bookingId, error } = useSelector(state => state.spotBooking);
  
//   const [formData, setFormData] = useState({
//     trailerNumber: '',
//     driverDetails: { name: '', contactNumber: '' },
//     trailerStatus: 'empty', // Default trailerStatus is 'empty'
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'driverDetails.name' || name === 'driverDetails.contactNumber') {
//       setFormData({
//         ...formData,
//         driverDetails: { ...formData.driverDetails, [name.split('.')[1]]: value },
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // We don't need to handle spotId, as it's passed via URL parameter
//     dispatch(bookSpot(formData));
//   };

//   return (
//     <div>
//       <h2>Book a Spot</h2>
//       {loading && <p>Booking in progress...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {message && <p>{message}</p>}
//       {bookingId && <p>Booking ID: {bookingId}</p>}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Trailer Number</label>
//           <input
//             type="text"
//             name="trailerNumber"
//             value={formData.trailerNumber}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Driver Name</label>
//           <input
//             type="text"
//             name="driverDetails.name"
//             value={formData.driverDetails.name}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Driver Contact</label>
//           <input
//             type="text"
//             name="driverDetails.contactNumber"
//             value={formData.driverDetails.contactNumber}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Trailer Status</label>
//           <select
//             name="trailerStatus"
//             value={formData.trailerStatus}
//             onChange={handleChange}
//           >
//             <option value="empty">Empty</option>
//             <option value="loaded">Loaded</option>
//           </select>
//         </div>
//         <button type="submit" disabled={loading}>
//           Book Spot
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BookingForm;
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { confirmBooking } from '../redux/serviceApi'; // Action to confirm booking
// import { useNavigate, useParams, useLocation } from 'react-router-dom'; // useLocation hook to get spotName
// import Toast from '../Toast';


// const BookingForm = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { spotId } = useParams(); // Get spotId from URL
//   const { spotName } = useLocation().state; // Get spotName from location state
//   const { status, bookingId, error } = useSelector((state) => state.spotBooking);

//   const [trailerNumber, setTrailerNumber] = useState('');
//   const [driverName, setDriverName] = useState('');
//   const [driverContact, setDriverContact] = useState('');
//   const [trailerStatus, setTrailerStatus] = useState('empty');

//   // Debugging: Check the value of spotId coming from the URL
//   console.log("Received Spot ID:", spotId); // This should now show the string like 'spot2'

//   // Handle form submission for booking
//   const handleBookingSubmit = (e) => {
//     e.preventDefault(); // Prevent the default form submission

//     // Dispatch the confirmBooking action with the form data
//     dispatch(
//       confirmBooking({
//         spotId,  // spotId passed from URL parameter (string like 'spot2')
//         trailerNumber,
//         driverDetails: { name: driverName, contactNumber: driverContact },
//         trailerStatus,
//       })
//     );
//   };

//   // Handle success or error response
//   const renderContent = () => {
//     if (status === 'loading') {
//       return <div>Processing booking...</div>;
//     }
//     if (status === 'succeeded') {
  
//       return <div>Your booking is confirmed! Booking ID: {bookingId}</div>;
//     }
//     if (status === 'failed') {
     
//       return <div>Error: {error}</div>;
//     }
//     return null;
//   };

//   return (
//     <div>
//     <Toast/>
//       <h1>Booking Spot: {spotName || spotId}</h1> {/* Showing spotName from location state */}
      
//       {/* Booking form for trailer */}
//       <form onSubmit={handleBookingSubmit}>
//         <div>
//           <label>Trailer Number</label>
//           <input
//             type="text"
//             value={trailerNumber}
//             onChange={(e) => setTrailerNumber(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label>Driver Name</label>
//           <input
//             type="text"
//             value={driverName}
//             onChange={(e) => setDriverName(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label>Driver Contact</label>
//           <input
//             type="text"
//             value={driverContact}
//             onChange={(e) => setDriverContact(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label>Trailer Status</label>
//           <select
//             value={trailerStatus}
//             onChange={(e) => setTrailerStatus(e.target.value)}
//           >
//             <option value="empty">Empty</option>
//             <option value="loaded">Loaded</option>
//           </select>
//         </div>

//         <button type="submit">Confirm Booking</button>
//       </form>

//       {/* Display booking result or error */}
//       {renderContent()}
//     </div>
//   );
// };

// export default BookingForm;


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmBooking } from '../redux/serviceApi'; // Action to confirm booking
import { useNavigate, useParams, useLocation } from 'react-router-dom'; // useLocation hook to get spotName
import Toast from '../Toast'; // Assuming you have a Toast component
import './BookingForm.css'; // Import the CSS file

const BookingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { spotId } = useParams(); // Get spotId from URL
  const { spotName } = useLocation().state; // Get spotName from location state
  const { status, bookingId, error } = useSelector((state) => state.spotBooking);

  const [trailerNumber, setTrailerNumber] = useState('');
  const [driverName, setDriverName] = useState('');
  const [driverContact, setDriverContact] = useState('');
  const [trailerStatus, setTrailerStatus] = useState('empty');

  // Debugging: Check the value of spotId coming from the URL
  console.log("Received Spot ID:", spotId); // This should now show the string like 'spot2'

  // Handle form submission for booking
  const handleBookingSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Dispatch the confirmBooking action with the form data
    dispatch(
      confirmBooking({
        spotId,  // spotId passed from URL parameter (string like 'spot2')
        trailerNumber,
        driverDetails: { name: driverName, contactNumber: driverContact },
        trailerStatus,
      })
    );
  };

  // Handle success or error response
  const renderContent = () => {
    if (status === 'loading') {
      return <div>Processing booking...</div>;
    }
    if (status === 'succeeded') {
      // return <div>Your booking is confirmed! Booking ID: {bookingId}
      navigate('/bookingconfirmation', { state: { bookingId } });
      
    }
    if (status === 'failed') {
      return <div className="error">Error: {error}</div>;
    }
    return null;
  };

  return (
    <div className="Bcontainer">
    <Toast />
      <div className="form-container">
       
        <h1>Booking Spot: {spotName || spotId}</h1> {/* Showing spotName from location state */}

        {/* Booking form for trailer */}
        <form onSubmit={handleBookingSubmit}>
          <div>
            <label>Trailer Number</label>
            <input
              type="text"
              value={trailerNumber}
              onChange={(e) => setTrailerNumber(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Driver Name</label>
            <input
              type="text"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Driver Contact</label>
            <input
              type="text"
              value={driverContact}
              onChange={(e) => setDriverContact(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Trailer Status</label>
            <select
              value={trailerStatus}
              onChange={(e) => setTrailerStatus(e.target.value)}
            >
              <option value="empty">Empty</option>
              <option value="loaded">Loaded</option>
            </select>
          </div>

          <button type="submit">Confirm Booking</button>
        </form>

        {/* Display booking result or error */}
        {renderContent()}

        <div className="form-footer">
          <p>Need help? Contact support.</p>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
