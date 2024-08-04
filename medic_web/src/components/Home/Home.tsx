import { useState, useEffect } from "react";
import Modal from "../Modal/UpdateModal";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { User } from "../../interfaces/User";
import AddModal from "../Modal/AddModal";
import { UserCard } from "../Cards/UserCard";
import { makeRequest } from "../../axios/makeRequest";
import BlockedUserModal from "../Modal/BlockedUserModal";

function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openAddModal, setopenAddModal] = useState(false);
  const [hoveredUserId, setHoveredUserId] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("jwtToken");

    const fetchUsers = async () => {
      try {
        const users = await makeRequest({
          method: "GET",
          endpoint: "/users",
          headers: {
            Authorization: `${token}`,
          },
        });

        if(users.headers.authorization)
        localStorage.setItem("jwtToken", users.headers.authorization);

        setUsers(users.data.data);

      } catch (err) {
        if (err instanceof Error) {
          setError(`${err.message}`);
        } else {
          setError("An error occurred");
        }
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = async (user: User) => {
    try {
      const token = localStorage.getItem("jwtToken");

      const userDetails = await makeRequest({
        method: "GET",
        endpoint: `/users/details/${user.id}`,
        headers: {
          Authorization: `${token}`,
        },
      });

      if(userDetails.headers.authorization)
      localStorage.setItem("jwtToken", userDetails.headers.authorization);
      setSelectedUser(userDetails.data.data);

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
      await makeRequest({
        method: "POST",
        endpoint: "/logout",
        data: {},
      });

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("jwtToken");
      navigate("/");

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unexpected error occurred");
      }
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button id="addButton" onClick={() => setopenAddModal(true)}>
        + Add User
      </button>
      <button id="logoutButton" onClick={() => handleLogout()}>
        Logout
      </button>

      <div className="container">
        {users
          .filter((user) => user.status === "active")
          .map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onClick={() => handleUserClick(user)}
              onMouseEnter={() => setHoveredUserId(user.id)}
              onMouseLeave={() => setHoveredUserId(null)}
              hoveredUserId={hoveredUserId}
              className="card"
              setUsers={setUsers}
            />
          ))}
        {users
          .filter((user) => user.status === "blocked")
          .map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onClick={() => handleUserClick(user)}
              onMouseEnter={() => setHoveredUserId(user.id)}
              onMouseLeave={() => setHoveredUserId(null)}
              hoveredUserId={hoveredUserId}
              className="card card-blocked"
              setUsers={setUsers}
            />
          ))}
      </div>
      {selectedUser?.status === "active" && (
        <Modal
          onClose={handleCloseModal}
          user={selectedUser}
          setUsers={setUsers}
        />
      )}

      {selectedUser?.status === "blocked" && (
        <BlockedUserModal
          onClose={handleCloseModal}
          user={selectedUser}
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
