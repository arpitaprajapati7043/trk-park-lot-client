// import Layout from './components/Layout/Layout';
// import Home from './Pages/Home/Home';
// import About from './Pages/About/About';
// import ParkingLotList from './ParkingLotList/ParkingLotList'
// import Contact from './Pages/Contact/Contact';
// import { Routes, Route } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import {fetchAllParkingLots } from './redux/serviceApi';
// import { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
// import Loading from './Loading/Loading';
// import AvailableParking from './AvailableParking/AvailableParking';
// import ViewSpotDetails from './ViewSpotDetails/ViewSpotDetails';
// import BookingSpot from './BookingSpot/BookingSpot';
// function App() {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, 4000);
//   }, []);

//   useEffect(() => {
//     // Dispatch the action to fetch parking slots when the app loads
//     dispatch(fetchAllParkingLots());
//   }, [dispatch]);

//   return (
//     <div>
//       {loading ? (
//         <Loading />
//       ) : (
//         <Routes>
//           <Route element={<Layout />}>
//             <Route index path='/' element={<Home />} />
//             <Route path='/about' element={<About />} />
//             <Route path='/parkinglotlist' element={<ParkingLotList/>} />
//             <Route path='/contact' element={<Contact />} />
//             <Route path='/availableparking' element={<AvailableParking />} />

//             <Route path="/book/:spotId" element={<BookingSpot />} />
//         <Route path="/spot/:spotId" element={<ViewSpotDetails />} />
//           </Route>
//         </Routes>
//       )}
//     </div>
//   );
// }

// export default App;
import Layout from './components/Layout/Layout';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import ParkingLotList from './ParkingLotList/ParkingLotList';
import Contact from './Pages/Contact/Contact';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAvailableSpots } from './redux/serviceApi';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Loading from './Loading/Loading';
// import BookingSpot from './BookingSpot/BookingSpot';
import BookingForm from './BookingForm/BookingForm';

import AvailableSpots from './AvailableParking/AvailableSpots';
import BookingId from './BookingForm/BookingConfirmation';
import BookingConfirmation from './BookingForm/BookingConfirmation';
function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch parking lots when the app loads
    dispatch(fetchAvailableSpots());
    setLoading(false); // Set loading to false once the fetch is complete
  }, [dispatch]);

  return (
    <div>
   
      {loading ? (
        <Loading />

      ) : (
        <Routes>
          <Route element={<Layout />}>
            <Route index path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/parkinglots' element={<ParkingLotList />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/availablespots' element={<AvailableSpots />} />
          
            <Route path='/bookingconfirmation' element={<BookingConfirmation />} />
            <Route path="/bookSpot/:spotId" element={<BookingForm />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
