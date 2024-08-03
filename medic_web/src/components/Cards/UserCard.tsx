import React from "react";
import { formatDate } from "../../helpers/dateForDatabase";
import { UserCardProps } from "../../interfaces/UserCard";
import { FaTrash } from "react-icons/fa";
import { makeRequest } from "../../axios/makeRequest";

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onClick,
  onMouseEnter,
  onMouseLeave,
  hoveredUserId,
  className,
  setUsers,
}) => {
  const handleDeleteUser = async (userId: number) => {
    try {
      await makeRequest({
        method: "DELETE",
        endpoint: `/users/${userId}`,
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };
  return (
    <div
      className={className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="naslov"
      >
        <strong>{user.name}</strong>
      </div>
      <img src={user.image_url} alt={`${user.name}`} />
      <div className="user-info">
        <strong>Username:</strong> {user.username}
        <br />
        <strong>Birthday:</strong>{" "}
        {formatDate(user.date_of_birth).split("-").reverse().join(".") ??
          "Unknown"}
      </div>
      <div className="role-info">
        <strong>ID:</strong> {user.id}
        <br />
        <strong>Orders:</strong> {user.orders}
      </div>
      {hoveredUserId === user.id && (
        <p id="hover-info">
          Last login date:{" "}
          {formatDate(user.last_login).split("-").reverse().join(".") ??
            "Never"}
        </p>
      )}
      <FaTrash
        className="trash-icon"
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteUser(user.id);
        }}
      />
    </div>
  );
};
