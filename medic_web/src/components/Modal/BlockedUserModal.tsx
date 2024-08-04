import React, { useState } from "react";
import "./BlockedModal.css";
import { ModalProps } from "../../interfaces/ModalProps";
import { makeRequest } from "../../axios/makeRequest";
import ErrorPopup from "../ErrorPopup/ErrorPopup";

const BlockedUserModal: React.FC<ModalProps> = ({
  onClose,
  user,
  setUsers,
}) => {
  const [error, setError] = useState<string | null>(null);

  const handleUnblockUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("jwtToken");

      const unblockedUser = await makeRequest({
        method: "PUT",
        endpoint: `/users/block/${user.id}`,
        data: { status: "active" },
        headers: {
          Authorization: `${token}`,
        },
      });

      const ID = unblockedUser.data.user.id;
      
      if(unblockedUser.headers.authorization)
      localStorage.setItem('jwtToken',unblockedUser.headers.authorization);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === ID ? { ...user, status: "active" } : user
        )
      );

      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(`${err.message}`);
      } else {
        setError("Failed to unblock user");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p id="poruka">
          Are you sure that you want to unblock <strong>{user.name}</strong> ?
        </p>
        <div className="modal-buttons">
          <button className="confirm-button" onClick={handleUnblockUser}>
            Yes
          </button>
          <button className="cancel-button" onClick={onClose}>
            No
          </button>
        </div>
        {error && <ErrorPopup message={error} onClose={() => setError(null)} />}

      </div>
    </div>
  );
};

export default BlockedUserModal;
