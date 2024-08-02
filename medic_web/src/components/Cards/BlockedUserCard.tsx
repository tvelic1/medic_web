import React from "react";
import { formatDate } from "../../helpers/dateForDatabase";
import { UserCardProps } from "../../interfaces/UserCard";



 export const BlockedUserCard: React.FC<UserCardProps> = ({
  user,
  onClick,
  onMouseEnter,
  onMouseLeave,
  hoveredUserId,
}) => {
  return (
    <div
      className="card card-blocked"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div style={{ marginTop: "-20px", marginBottom: "15px", fontSize:"20px" }}>
        <strong>{user.name}</strong>
      </div>
      <img src={user.image_url} alt={`${user.name}`} />
      <div className="user-info">
        <strong>Username:</strong> {user.username}
        <br />
        <strong>Birthday:</strong>{" "}
        {formatDate(user.date_of_birth)
          .split("-")
          .reverse()
          .join(".") ?? "Unknown"}
      </div>
      <div className="role-info">
        <strong>ID:</strong> {user.id}
        <br />
        <strong>Orders:</strong> {user.orders}
      </div>
      {hoveredUserId === user.id && (
        <p id="hover-info">
          Last login date:{" "}
          {formatDate(user.last_login).split("-").reverse().join(".") ?? "Never"}
        </p>
      )}
    </div>
  );
};

