import React from "react";
import "./ErrorPopup.css";
import { IErrorPopup } from "../../interfaces/ModalProps";



const ErrorPopup: React.FC<IErrorPopup> = ({ message, onClose }) => {
  return (
    <div className="flogin-overlay">
      <div className="flogin-content">
        <p>{message}</p>
        <button onClick={onClose} className="flogin-close-btn">Try Again</button>
      </div>
    </div>
  );
};

export default ErrorPopup;
