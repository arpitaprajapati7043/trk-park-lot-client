import React from 'react';
import './Modal.css';

const Modal = ({ show, handleClose, children }) => {
  if (!show) return null; // If show is false, don't render anything

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={handleClose}>X</button>
        {children} {/* This is where the booking form will go */}
      </div>
    </div>
  );
};

export default Modal;
