import React from "react";
import "./FailedLogin.css";
import { IFailedLogin } from "../../interfaces/ModalProps";



const FailedLogin: React.FC<IFailedLogin> = ({ message, onClose }) => {
  return (
    <div className="flogin-overlay">
      <div className="flogin-content">
        <p>{message}</p>
        <button onClick={onClose} className="flogin-close-btn">Try Again</button>
      </div>
    </div>
  );
};

export default FailedLogin;
