import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../Modal/Modal";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { User } from "./User";
import AddModal from "../Modal/AddModal";

function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openAddModal, setopenAddModal] = useState(false);
  const [hoveredUserId, setHoveredUserId] = useState<number | null>(null);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://medic-api-3vyj.vercel.app/users",
          { withCredentials: true }
        );

        setUsers(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(`HTTP error! Status: ${err.response.status}`);
        } else {
          setError("An error occurred");
        }
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = async (user: User) => {
    try {
      const response = await axios.get(
        `https://medic-api-3vyj.vercel.app/users/details/${user.id}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        setSelectedUser(response.data);
        console.log(response.data);
      } else {
        setError("User not found");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred while fetching user details");
      }
    }
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setopenAddModal(false);
  };
  

  const handleLogout = async (): Promise<void> => {
    try {
      await axios.post(
        "https://medic-api-3vyj.vercel.app/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("isLoggedIn");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button id="addButton" onClick={() => setopenAddModal(true)}>
        Add
      </button>
      <button id="logoutButton" onClick={() => handleLogout()}>
        Logout
      </button>

      <div className="container">
        {users.map((user) => (
          <div
            className="card"
            key={user.id}
            onClick={() => handleUserClick(user)}
            onMouseEnter={() => setHoveredUserId(user.id)}
            onMouseLeave={() => setHoveredUserId(null)}
          >
            <div style={{ marginTop: "-20px", marginBottom: "15px" }}>
              <strong>{user.name}</strong>
            </div>
            <img
              src={user.image_url}
            />
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
              <p id="hover-info">Last login date: {formatDate(user.last_login).split("-").reverse().join(".") ?? "Never"}</p>
            )}
          </div>
        ))}
      </div>
      {selectedUser && (
        <Modal
          onClose={handleCloseModal}
          user={selectedUser}
          users={users}
          setUsers={setUsers}
        />
      )}
      {openAddModal && (
        <AddModal onClose={handleCloseModal} setUsers={setUsers} />
      )}
    </div>
  );
}

export default Home;
