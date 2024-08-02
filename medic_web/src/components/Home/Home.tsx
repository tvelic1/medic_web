import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { User } from "../../interfaces/User";
import AddModal from "../Modal/AddModal";
import { UserCard } from "../Cards/UserCard";
import { BlockedUserCard } from "../Cards/BlockedUserCard";
import { makeRequest } from "../../axios/makeRequest";

function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openAddModal, setopenAddModal] = useState(false);
  const [hoveredUserId, setHoveredUserId] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await makeRequest({
          method: 'GET',
          endpoint: '/users',
        });
  
        setUsers(users);
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
      const userDetails = await makeRequest({
        method: 'GET',
        endpoint: `/users/details/${user.id}`,
      });
  
      setSelectedUser(userDetails);
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
        method: 'POST',
        endpoint: '/logout',
        data: {},
      });
  
      localStorage.removeItem("isLoggedIn");
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
          />
          )
          
          )}
          {users
          .filter((user) => user.status === "blocked")
          .map((user) => (
            <BlockedUserCard
            key={user.id}
            user={user}
            onClick={() => handleUserClick(user)}
            onMouseEnter={() => setHoveredUserId(user.id)}
            onMouseLeave={() => setHoveredUserId(null)}
            hoveredUserId={hoveredUserId}
          />
          ))}



      </div>
      {selectedUser && (
        <Modal
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
