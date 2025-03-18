// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { bookSpot } from '../redux/serviceApi';
// import { useNavigate, useParams } from 'react-router-dom';
// import './BookingSpot.css';  // Ensure you have this CSS file

// const BookingSpot = () => {
//   const { spotId } = useParams();  // Fetch spotId from the URL
//   const [trailerNumber, setTrailerNumber] = useState('');
//   const [trailerStatus, setTrailerStatus] = useState('');  // New state for trailer status (dropdown)
//   const [driverDetails, setDriverDetails] = useState({
//     name: '',
//     contactNumber: '',
//   });
//   const [exitTime, setExitTime] = useState('');
//   const dispatch = useDispatch();
//   const { loading, booking, error, bookingId } = useSelector((state) => state.booking);  // Get bookingId from state
//   const navigate = useNavigate();

//   const handleBookSpot = () => {
//     // Prepare the booking data
//     const bookingData = {
//       spotId,  // spotId should be passed dynamically from the URL
//       trailerNumber,
//       trailerStatus,
//       driverDetails,
//       exitTime,
//     };

//     // Dispatch the booking action
//     dispatch(bookSpot(bookingData));
//   };

//   if (loading) return <div className="loading">Booking...</div>;


//   if (booking) {
//     return (
//       <div className="booking-success">
//         <h3>Booking Successful</h3>
//         <p>Booking ID: {bookingId}</p>
//         <button className="view-spot-button" onClick={() => navigate(`/spot/${spotId}`)}>View Spot</button>
//       </div>
//     );
//   }
  

//   if (error) return <div className="error-message">Error: {error}</div>;

//   return (
//     <div className="booking-container">
//       <h3 className="booking-heading">Book Spot {spotId}</h3>

//       <div className="form-group">
//         <input
//           type="text"
//           placeholder="Trailer Number"
//           value={trailerNumber}
//           onChange={(e) => setTrailerNumber(e.target.value)}
//           className="input-field"
//         />
//       </div>

//       <div className="form-group">
//         <select
//           value={trailerStatus}
//           onChange={(e) => setTrailerStatus(e.target.value)}  // Handle trailer status change
//           className="input-field"
//         >
//           <option value="">Select Trailer Status</option>
//           <option value="loaded">Loaded</option>
//           <option value="unloaded">Unloaded</option>
//           <option value="in-transit">In Transit</option>
//           <option value="empty">Empty</option>
//         </select>
//       </div>

//       <div className="form-group">
//         <input
//           type="text"
//           placeholder="Driver Name"
//           value={driverDetails.name}
//           onChange={(e) => setDriverDetails({ ...driverDetails, name: e.target.value })}
//           className="input-field"
//         />
//       </div>

//       <div className="form-group">
//         <input
//           type="text"
//           placeholder="Driver Contact Number"
//           value={driverDetails.contactNumber}
//           onChange={(e) => setDriverDetails({ ...driverDetails, contactNumber: e.target.value })}
//           className="input-field"
//         />
//       </div>

//       <div className="form-group">
//         <input
//           type="datetime-local"
//           placeholder="Exit Time"
//           value={exitTime}
//           onChange={(e) => setExitTime(e.target.value)}  // Handle exit time change
//           className="input-field"
//         />
//       </div>

//       <button className="book-now-button" onClick={handleBookSpot}>Book Now</button>
//     </div>
//   );
// };

// export default BookingSpot;


// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useParams, useLocation } from 'react-router-dom'; // To get spotId from the URL
// import { bookSpot } from '../redux/serviceApi'; // Assuming the bookSpot action is implemented
// import './BookingSpot.css';

// const BookingSpot = () => {
//   const location = useLocation(); 
//   const spotName = location.state?.spotName; 
  
//   const { spotId } = useParams();  // Get spotId from URL params
//   const [formData, setFormData] = useState({
//     trailerNumber: '',
//     driverDetails: '',
//     trailerStatus: '',
//   });

//   const dispatch = useDispatch();

//   // Handle form input changes
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     // Dispatch bookSpot action to book the spot
//     dispatch(bookSpot(spotId, formData))
//       .then(() => {
//         alert('Spot successfully booked!');
//         // You can redirect to a different page or reset the form
//       })
//       .catch((error) => {
//         console.error('Booking failed:', error);
//       });
//   };

//   return (
//     <div className="booking-form-container">
//       <h2>Booking Spot - {spotId}</h2>
//       <form onSubmit={handleFormSubmit}>
//         <div>
//           <label htmlFor="trailerNumber">Trailer Number</label>
//           <input
//             type="text"
//             id="trailerNumber"
//             name="trailerNumber"
//             value={formData.trailerNumber}
//             onChange={handleFormChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="driverDetails">Driver Details</label>
//           <input
//             type="text"
//             id="driverDetails"
//             name="driverDetails"
//             value={formData.driverDetails}
//             onChange={handleFormChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="trailerStatus">Trailer Status</label>
//           <input
//             type="text"
//             id="trailerStatus"
//             name="trailerStatus"
//             value={formData.trailerStatus}
//             onChange={handleFormChange}
//             required
//           />
//         </div>
//         <button type="submit" className="submit-button">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default BookingSpot;


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom'; // To get spotId from the URL
import { bookSpot } from '../redux/serviceApi'; // Assuming the bookSpot action is implemented
import './BookingSpot.css';
import { useSelector } from 'react-redux';
const BookingSpot = () => {
  const location = useLocation(); 
  const spotName = location.state?.spotName; // If you want to display spotName from location.state
  const { bookingId, loading, error } = useSelector((state) => state.spotBooking);
  const { spotId } = useParams();  // Get spotId from URL params
  const [formData, setFormData] = useState({
    trailerNumber: '',
    driverDetails: {
      name: '',
      contactNumber: '',
    },
    trailerStatus: 'empty', // Default status is 'empty'
  });

  const dispatch = useDispatch();

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('driverDetails')) {
      const fieldName = name.split('.')[1]; // "name" or "contactNumber"
      setFormData((prevData) => ({
        ...prevData,
        driverDetails: {
          ...prevData.driverDetails,
          [fieldName]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Dispatch bookSpot action to book the spot
    dispatch(bookSpot(spotId, formData))
      .then(() => {
        alert('Spot successfully booked!');
        // You can redirect to a different page or reset the form
      })
      .catch((error) => {
        console.error('Booking failed:', error);
      });
  };
  if (bookingData) {
        return (
          <div className="bookingData-success">
            <h3>Booking Successful</h3>
            <p>Booking ID: {bookingId}</p>
            
          </div>
        );
      }

  return (
    <div className="booking-form-container">
    
      <h2>Booking Spot - {spotName}</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="trailerNumber">Trailer Number</label>
          <input
            type="text"
            id="trailerNumber"
            name="trailerNumber"
            value={formData.trailerNumber}
            onChange={handleFormChange}
            required
          />
        </div>

        <div>
          <label htmlFor="driverDetails.name">Driver Name</label>
          <input
            type="text"
            id="driverDetails.name"
            name="driverDetails.name"
            value={formData.driverDetails.name}
            onChange={handleFormChange}
            required
          />
        </div>

        <div>
          <label htmlFor="driverDetails.contactNumber">Driver Contact Number</label>
          <input
            type="text"
            id="driverDetails.contactNumber"
            name="driverDetails.contactNumber"
            value={formData.driverDetails.contactNumber}
            onChange={handleFormChange}
            required
          />
        </div>

        <div>
          <label htmlFor="trailerStatus">Trailer Status</label>
          <select
            id="trailerStatus"
            name="trailerStatus"
            value={formData.trailerStatus}
            onChange={handleFormChange}
            required
          >
            <option value="empty">Empty</option>
            <option value="loaded">Loaded</option>
          </select>
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default BookingSpot;
