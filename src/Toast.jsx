import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  const { message, success } = useSelector((state) => state.spotBooking);
  console.log("Toast Component - message:", message);
  console.log("Toast Component - success:", success);
  useEffect(() => {
    if (message) {
      if (success) {
        toast.success(message); // Success message
      } else {
        toast.error(message);  // Error message
      }
    }
  }, [message, success]); // Re-run when message or success changes

  return <ToastContainer />;
};

export default Toast;
