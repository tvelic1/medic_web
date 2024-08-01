import React, { ChangeEvent, useState } from "react";
import "./Modal.css";
import { ModalAddProps } from "../../interfaces/ModalProps";
import { handleDecrementOrdersUser, handleIncrementOrdersUser } from "../../helpers/handleOrders";
import { validateImageUrl } from "../../helpers/checkImageURL";
import { User } from "../../interfaces/User";


const AddModal: React.FC<ModalAddProps> = ({ onClose, setUsers }) => {
 
  const [formValues, setFormValues] = useState<User>({
    id:0,
    username:'',
    password:'',
    name:'',
    orders: 0,
    date_of_birth:'',
    image_url: '',
    status:'',
    last_login:'' //neki od ovih atributa su nebitni za dodavanje usera, jer se imaju default vrijednost u bazi, ali su tu zbog kompatibilnosti tipova

  });

 
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    if (name === "orders") {
      const numberValue = parseInt(value);
      if (numberValue < 0 || numberValue > 10) {
        return;
      }
    }
  
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    let imageUrl = await validateImageUrl(formValues.image_url);
  
    const response = await fetch(`https://medic-api-3vyj.vercel.app/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',  
      body: JSON.stringify({
        username: formValues.username,
        password: formValues.password,
        name: formValues.name,
        orders: formValues.orders,
        date_of_birth: formValues.date_of_birth,
        image_url: imageUrl,
      }),
    });
  
    if (response.ok) {

      const addedUser = await response.json();
      setUsers((prevUsers) => [...prevUsers, addedUser.user]);
      alert("User added successfully");
      onClose(); 

    } else {
      alert("Failed to add user");
    }
  };

  
  
  return (
    <div className="modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          X
        </button>
       
        <h2>Add New User</h2>
        <form id="modalForm" onSubmit={handleSubmit}>
          
          <label className="labele" htmlFor="username">
            Username:{" "}
          </label>
          <input
            className="modalinput"
            name="username"
            type="text"
            value={formValues.username}
            onChange={handleChange}
            placeholder="username"
            required
          />
           <label className="labele" htmlFor="password">
            Password:{" "}
          </label>
          <input
            className="modalinput"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="password"
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
            placeholder="name"
            required
          />
          <label className="labele" htmlFor="role">
            Orders:{" "}
          </label>
          <div className="orders-input-wrapper">
          <button type="button" onClick={()=>handleDecrementOrdersUser(setFormValues)}>-</button>
          <input
            className="modalinput"
            name="orders"
            type="text"
            value={formValues.orders}
            onChange={handleChange}
            placeholder="orders"
            required
          />
          <button type="button" onClick={()=>handleIncrementOrdersUser(setFormValues)}>+</button>
        </div>
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
            placeholder="image_url"
            required
          />
          <button type="submit" className="submit-btn">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
