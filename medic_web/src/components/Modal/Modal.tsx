import React, { ChangeEvent, useState } from "react";
import "./Modal.css";
import { User } from '../Home/User';

interface ModalProps {
  onClose: () => void;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  user: User;
  users:User[];
}

const Modal: React.FC<ModalProps> = ({ onClose, user, users, setUsers }) => {
  
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formValues, setFormValues] = useState({
    id: user.id,
    username: user.username,
    name: user.name,
    orders: Number(user.orders),
    date_of_birth: formatDate(user.date_of_birth),
    image_url: user.image_url,

  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`https://medic-api-3vyj.vercel.app/users/details/${formValues.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',  

      body: JSON.stringify({
        username: formValues.username,
        name: formValues.name,
        orders: formValues.orders,
        date_of_birth: formValues.date_of_birth,
        image_url: formValues.image_url,
      }),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      const ID=updatedUser.user.id;
      setUsers((prevUsers) =>
        prevUsers.map((useri) => (useri.id === ID ? updatedUser.user : useri))
      );   
      console.log(users);
      
      alert("User updated successfully");
      onClose(); 
    } else {
      alert("Failed to update user");
    }
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
          <label className="labele" htmlFor="id">
            ID:{" "}
          </label>
          <input
            className="modalinput"
            name="id"
            type="text"
            value={formValues.id.toString()}
            readOnly
          />
          <label className="labele" htmlFor="username">
            Username:{" "}
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
            Name:{" "}
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
            Orders:{" "}
          </label>
          <input
            className="modalinput"
            name="orders"
            type="text"
            value={formValues.orders}
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
           <label className="labele" htmlFor="date_of_birth">
            image_url:{" "}
          </label>
          <input
            className="modalinput"
            name="image_url"
            type="text"
            value={formValues.image_url}
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
