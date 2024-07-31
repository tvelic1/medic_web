import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../Modal/Modal';
import './Home.css';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  username: string;
  name: string;
  role: string;
  date_of_birth: string;
}
function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const navigate=useNavigate();


  useEffect(() => {
    
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('https://medic-api.vercel.app/users', { withCredentials: true });
        setUsers(response.data);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data as string);
        } else {
          setError('An error occurred');
        }
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  

  const handleLogout = async (): Promise<void> => {
    try {
      await axios.post('https://medic-api.vercel.app/logout', {}, { withCredentials: true });
      localStorage.removeItem('isLoggedIn');
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button id='addButton'>Add</button>
      <button id='logoutButton' onClick={()=>handleLogout()}>Logout</button>


      <div className="container">
        {users.map(user => (
          <div className="card" key={user.id} onClick={() => handleUserClick(user)}>
<div style={{ marginTop: '-20px', marginBottom:'15px' }}>
  <strong>{user.name}</strong>
</div>            <img src={`https://c0.wallpaperflare.com/preview/386/354/385/analysis-hospital-doctor-medical.jpg`} />
            <div className="user-info">
              <strong>Username:</strong> {user.username}<br />
              <strong>Name:</strong> {user.name}
            </div>
            <div className="role-info">
              <strong>Role:</strong> {user.role}
            </div>
          </div>
        ))}
      </div>
      {selectedUser && (
        <Modal onClose={handleCloseModal} user={selectedUser} />
      )}
    </div>
  );
}

export default Home;
