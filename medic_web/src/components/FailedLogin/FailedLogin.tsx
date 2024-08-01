import React from "react";
import "./FailedLogin.css";

interface ModalProps {
  message: string;
  onClose: () => void;
}

const FailedLogin: React.FC<ModalProps> = ({ message, onClose }) => {
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
