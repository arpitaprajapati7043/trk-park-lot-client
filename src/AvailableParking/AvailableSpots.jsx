// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux'; // Access Redux state
// import { Button, Card } from 'react-bootstrap'; // You can use bootstrap for styling
// import {fetchAllParkingLots } from '../redux/serviceApi'; // Import action to fetch slots
// import './AvailableParking.css'


// function AvailableParking() {
//   const dispatch = useDispatch();
  
//   // Access available parking slots and available count from the Redux store
//   const { parking_slots, availableCount, loading, error } = useSelector((state) => state.parking);

//   useEffect(() => {
//     // Fetch parking slots when component mounts
//     dispatch(fetchAllParkingLots());
//   }, [dispatch]);

//   // Handle booking logic
//   const handleBooking = (slotId) => {
//     console.log(`Booking parking slot with id: ${slotId}`);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="parking-container">
//       <h1>Available Parking Slots</h1>

//       {availableCount > 0 ? (
//         <div className="parking-slots">
//           {parking_slots
//             .filter((slot) => !slot.isBooked) // Only show available slots
//             .map((slot) => (
//               <Card key={slot.id} className="parking-slot-card">
//                 <Card.Body>
//                   <Card.Title>{slot.slotName}</Card.Title>
//                   <Card.Text>{slot.location}</Card.Text>
//                   <Button 
//                     variant="primary" 
//                     onClick={() => handleBooking(slot.id)}
//                   >
//                     Book Slot
//                   </Button>
//                 </Card.Body>
//               </Card>
//             ))}
//         </div>
//       ) : (
//         <p>No available parking slots.</p>
//       )}
//     </div>
//   );
// }

// export default AvailableParking;


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAvailableSpots } from '../redux/serviceApi';

// const AvailableSpots = () => {
//   // Dispatch function to trigger the async action
//   const dispatch = useDispatch();

//   // Redux store se available spot count ko fetch karna
//   const { count, status, error } = useSelector((state) => state.availableSpot);

//   useEffect(() => {
//     if (status === 'idle') {
//       dispatch(fetchAvailableSpots());
//     }
//   }, [status, dispatch]);

//   return (
//     <div>
//       <h1>Available Parking Spots</h1>
//       {status === 'loading' && <p>Loading...</p>}
//       {status === 'failed' && <p style={{ color: 'red' }}>{error}</p>}
//       {status === 'succeeded' && <p>Total available spots: {count}</p>}
//     </div>
//   );
// };

// export default AvailableSpots;


// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAvailableSpots } from '../redux/serviceApi';

// const AvailableSpots = () => {
//   const dispatch = useDispatch();
//   const availableCount = useSelector(state => state.availableSpot.availableCount);
//   const spotsDetails = useSelector(state => state.availableSpot.spotsDetails);
  
//   useEffect(() => {
//     dispatch(fetchAvailableSpots());
//   }, [dispatch]);

//   if (availableCount === undefined || spotsDetails.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Total Available Spots: {availableCount}</h1>
//       <div>
//         {spotsDetails.length > 0 ? (
//           <ul>
//             {spotsDetails.map((spot, index) => (
//               <li key={index}>
//                 {spot.spotName} - {spot.status ? 'Available' : 'Booked'}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No available spots</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AvailableSpots;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAvailableSpots, confirmBooking } from '../redux/serviceApi'; // Actions to fetch and book spots
import { useNavigate, useParams } from 'react-router-dom';

const AvailableSpots = () => {
  const {spotId}=useParams();
  console.log("Received Spot ID:", spotId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const availableCount = useSelector(state => state. availableSpot.availableCount);
  const spotsDetails = useSelector(state => state. availableSpot.spotsDetails);
  const { status, error } = useSelector(state => state.spotBooking);

  useEffect(() => {
    dispatch(fetchAvailableSpots()); // Fetch available spots when component mounts
  }, [dispatch]);

  // Handle booking a spot
  const handleBooking = (spotId, spotName) => {
    navigate(`/bookSpot/${spotId}`, { state: { spotName } }); // Navigate to booking form
  };

  // Render available spots or message
  const renderSpots = () => {
    if (status === 'loading') {
      return <div>Loading available spots...</div>;
    }

    if (status === 'failed') {
      return <div>Error: {error}</div>;
    }

    if (availableCount > 0 && spotsDetails.length > 0) {
      return (
        <div>
          <h3>Total Available Spots: {availableCount}</h3>
          <ul>
            {spotsDetails.map((spot, index) => (
              <li key={index}>
                <div>
                  <span>{spot.spotName}</span> - {spot.status ? 'Available' : 'Booked'}
                  {spot.status && (
                    <button onClick={() => handleBooking(spot.spotId, spot.spotName)}>
                      Book Now
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return <div>No available spots</div>;
  };

  return (
    <div>
      <h1>Available Parking Spots</h1>
      {renderSpots()}
    </div>
  );
};

export default AvailableSpots;
