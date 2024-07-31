import React, { ChangeEvent, useState } from "react";
import "./Modal.css";

interface ModalProps {
  onClose: () => void;
  user: {
    username: string;
    name: string;
    role: string;
    date_of_birth: string;
  };
}

const Modal: React.FC<ModalProps> = ({ onClose, user }) => {
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formValues, setFormValues] = useState({
    username: user.username,
    name: user.name,
    role: user.role,
    date_of_birth: formatDate(user.date_of_birth),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <button className="modal-block" onClick={onClose}>
          Block
        </button>
        <h2>User Details</h2>
        <form id="modalForm" onSubmit={handleSubmit}>
          <label className="labele" htmlFor="username">
            Name:{" "}
          </label>
          <input
            className="modalinput"
            name="username"
            type="text"
            value={formValues.username}
            onChange={handleChange}
            placeholder="prezime"
            required
          />
          <label className="labele" htmlFor="name">
            Username:{" "}
          </label>

          <input
            className="modalinput"
            name="name"
            type="text"
            value={formValues.name}
            onChange={handleChange}
            placeholder="ime"
            required
          />
          <label className="labele" htmlFor="role">
            Role:{" "}
          </label>

          <input
            className="modalinput"
            name="role"
            type="text"
            value={formValues.role}
            onChange={handleChange}
            placeholder="Uloga"
            required
          />
          <label className="labele" htmlFor="date_of_birth">
            Birthday:{" "}
          </label>

          <input
            className="modalinput"
            name="date_of_birth"
            type="date"
            value={formValues.date_of_birth}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-btn">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
