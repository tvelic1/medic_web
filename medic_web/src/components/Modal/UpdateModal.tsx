import React, { useState } from "react";
import "./Modal.css";
import { ModalProps } from "../../interfaces/ModalProps";
import { formatDate } from "../../helpers/dateForDatabase";
import { User } from "../../interfaces/User";
import {
  handleDecrementOrdersUser,
  handleIncrementOrdersUser,
} from "../../helpers/handleOrders";
import { validateImageUrl } from "../../helpers/checkImageURL";
import { handleChange } from "../../helpers/handleChange";
import { makeRequest } from "../../axios/makeRequest";
import ErrorPopup from "../ErrorPopup/ErrorPopup";

const Modal: React.FC<ModalProps> = ({ onClose, user, setUsers }) => {
  const [formValues, setFormValues] = useState<User>({
    ...user,
    date_of_birth: formatDate(user.date_of_birth),
  });
  //neki od atributa usera su nebitni za update usera, jer se ne trebaju update, ali su tu zbog kompatibilnosti tipova
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    const token = localStorage.getItem("jwtToken");
    setLoading(true);
    const imageUrl = await validateImageUrl(formValues.image_url);

    const body: { [key: string]: any } = {};

    if (user.username !== formValues.username) {
      body.username = formValues.username;
    }
    if (user.name !== formValues.name) {
      body.name = formValues.name;
    }
    if (user.orders !== formValues.orders) {
      body.orders = formValues.orders;
    }
    if (user.date_of_birth !== formValues.date_of_birth) {
      body.date_of_birth = formValues.date_of_birth;
    }
    if (user.image_url !== imageUrl) {
      body.image_url = imageUrl;
    }
    try {
      const updatedUser = await makeRequest({
        method: "PUT",
        endpoint: `/users/details/${formValues.id}`,
        data: body,
        headers: {
          Authorization: `${token}`,
        },
      });

      const ID = updatedUser.data.user.id;
      
      if(updatedUser.headers.authorization)
      localStorage.setItem("jwtToken", updatedUser.headers.authorization);

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === ID ? updatedUser.data.user : user))
      );
      
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(`${err.message}`);
      } else {
        setError("Failed to update user");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("jwtToken");

      const blockedUser = await makeRequest({
        method: "PUT",
        endpoint: `/users/block/${formValues.id}`,
        data: { status: "blocked" },
        headers: {
          Authorization: `${token}`,
        },
      });

      const ID = blockedUser.data.user.id;

      if(blockedUser.headers.authorization)
      localStorage.setItem("jwtToken", blockedUser.headers.authorization);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === ID ? { ...user, status: "blocked" } : user
        )
      );

      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(`${err.message}`);
      } else {
        setError("Failed to block user");
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <button className="modal-block" onClick={handleBlockUser}>
          Block
        </button>
        <h2>User Details</h2>
        <img
          src={formValues.image_url}
          style={{ width: "150px", borderRadius: "40%", height: "150px" }}
        />{" "}
        <form id="modalForm" onSubmit={handleSubmit}>
          <label className="labele" htmlFor="id">
            ID:{" "}
          </label>
          <input
            className="modalinput readonly"
            name="id"
            type="text"
            value={formValues.id.toString()}
            readOnly
          />
          <label className="labele" htmlFor="status">
            Status:{" "}
          </label>
          <input
            className="modalinput readonly"
            name="status"
            type="text"
            value={formValues.status}
            readOnly
          />
          <label className="labele" htmlFor="last_login">
            Last login date:{" "}
          </label>
          <input
            className="modalinput readonly"
            name="last_login"
            type="text"
            value={
              formatDate(formValues.last_login)
                .split("-")
                .reverse()
                .join(".") ?? "Never"
            }
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
            onChange={(e) => handleChange(e, setFormValues)}
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
            onChange={(e) => handleChange(e, setFormValues)}
            placeholder="name"
            required
          />
          <label className="labele" htmlFor="role">
            Orders:{" "}
          </label>
          <div className="orders-input-wrapper">
            <button
              type="button"
              onClick={() => handleDecrementOrdersUser(setFormValues)}
            >
              -
            </button>
            <input
              className="modalinput"
              name="orders"
              type="text"
              value={formValues.orders}
              onChange={(e) => handleChange(e, setFormValues)}
              placeholder="orders"
              required
            />
            <button
              type="button"
              onClick={() => handleIncrementOrdersUser(setFormValues)}
            >
              +
            </button>
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
            onChange={(e) => handleChange(e, setFormValues)}
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
            onChange={(e) => handleChange(e, setFormValues)}
            required
          />
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <div className="loader"></div> : "Update"}
          </button>
        </form>
        {error && <ErrorPopup message={error} onClose={() => setError(null)} />}
      </div>
    </div>
  );
};

export default Modal;
