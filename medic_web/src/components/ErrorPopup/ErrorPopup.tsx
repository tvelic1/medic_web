import React from "react";
import "./ErrorPopup.css";
import { IErrorPopup } from "../../interfaces/ModalProps";
import { useNavigate } from "react-router-dom";

const ErrorPopup: React.FC<IErrorPopup> = ({ message, onClose }) => {
  const navigate = useNavigate();
  return (
    <div className="flogin-overlay">
      <div className="flogin-content">
        <p>{message}</p>
        {message !== "Invalid token" ? (
          <button onClick={onClose} className="flogin-close-btn">
            Try Again
          </button>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem("jwtToken");
              navigate("/");
              onClose;
            }}
            className="flogin-close-btn"
          >
            Login again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorPopup;
