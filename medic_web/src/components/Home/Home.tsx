import { useState, useEffect } from "react";
import axios from "axios";

// Define the shape of the user data
interface User {
  id: number;
  username: string;
  name: string;
  role: string;
}

function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  /*useEffect(() => {
    // Fetch users when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('https://medic-api.vercel.app/users', { withCredentials: false });
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
  }, []);*/

  return (
    <div>
      <h1>Users</h1>
      
    </div>
  );
}

export default Home;
