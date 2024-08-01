import React, { useState } from "react";
import "./Modal.css";
import { ModalProps } from "../../interfaces/ModalProps";
import { formatDate } from "../../helpers/dateForDatabase";
import {User} from "../../interfaces/User";
import { handleDecrementOrdersUser, handleIncrementOrdersUser } from "../../helpers/handleOrders";
import { validateImageUrl } from "../../helpers/checkImageURL";
import { handleChange } from "../../helpers/handleChange";
import axios from "axios";



const Modal: React.FC<ModalProps> = ({ onClose, user, setUsers }) => {

  const [formValues, setFormValues] = useState<User>({...user,date_of_birth: formatDate(user.date_of_birth)})
  //neki od atributa usera su nebitni za update usera, jer se ne trebaju update, ali su tu zbog kompatibilnosti tipova
  

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrl = await validateImageUrl(formValues.image_url);
  
    try {
      const response = await axios.put(
        `https://medic-api-3vyj.vercel.app/users/details/${formValues.id}`,
        {
          username: formValues.username,
          name: formValues.name,
          orders: formValues.orders,
          date_of_birth: formValues.date_of_birth,
          image_url: imageUrl,
        },
        {withCredentials: true}
      
      );

      const updatedUser = response.data;
      const ID = updatedUser.user.id;
      setUsers((prevUsers) =>
        prevUsers.map((useri) => (useri.id === ID ? updatedUser.user : useri))
      );   
      
      onClose(); 

    } catch (error) {
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
            onChange={(e)=>handleChange(e,setFormValues)}
            placeholder="username"
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
            onChange={(e)=>handleChange(e,setFormValues)}
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
            onChange={(e)=>handleChange(e,setFormValues)}
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
            placeholder="date_of_birth"
            type="date"
            value={formValues.date_of_birth}
            onChange={(e)=>handleChange(e,setFormValues)}
            required
          />
           <label className="labele" htmlFor="image_url">
            image_url:{" "}
          </label>
          <input
            className="modalinput"
            name="image_url"
            type="text"
            placeholder="image_url"

            value={formValues.image_url}
            onChange={(e)=>handleChange(e,setFormValues)}
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
