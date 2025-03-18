import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllParkingLots } from '../redux/serviceApi'; // Assuming this is already set up for fetching parking lots.
import { useNavigate } from 'react-router-dom'; // For navigation using button click
import './ParkingLotList.css';

const ParkingLotList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const { parkingLotData, status, error } = useSelector((state) => state.parkinglots);
  
  // Fetch parking lots on component mount
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllParkingLots());
    }
  }, [dispatch, status]);

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    if (parkingLotData && parkingLotData.parkingLotData && parkingLotData.parkingLotData.length > 0) {
      content = (
        <div className="parking-lot-container">
          {parkingLotData.parkingLotData.map((lot) => (
            <div className="parking-lot-card" key={lot._id}>
              <h3>{lot.address.street}, {lot.address.city}</h3>
              <p>{lot.address.state}, {lot.address.zip}</p>

              {/* Spots displayed in a row for each parking lot */}
              <div className="spot-grid">
                {lot.spots && lot.spots.length > 0 ? (
                  lot.spots.map((spot) => (
                    <div key={spot._id} className="spot-card">
                      <h4>{spot.spotName}</h4>
                      <p>Status: {spot.status ? 'Available' : 'Booked'}</p>

                      {/* Button to navigate to booking page */}
                      {spot.status ? (
                        <button 
                          className="book-button green-button"
                          onClick={() => navigate(`/bookSpot/${spot._id}`, { state: { spotName: spot.spotName } })} // Navigate to booking page with spotId
                        >
                          Book
                        </button>
                      ) : (
                        <button className="book-button red-button" disabled>
                          Unavailable
                        </button>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No spots available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      content = <div>No parking lots available</div>;
    }
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <h2>Parking Lots</h2>
      {content}
    </div>
  );
};

export default ParkingLotList;


