import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login/Login"
import Home from "./components/Home/Home"
import './App.css';



/*interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  prezime: string;
  orders: number;
  image_url: string;
  date_of_birth: string;
  last_login: string;
  status: string;
  role: string;
}

/*const API_URL = 'https://medic-api.vercel.app/s';

export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
*/
function App() {
 /* const [count, setCount] = useState(0);
  const [data, setData] = useState<User[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);*/

  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<Login/>} />
      </Routes>
      <Routes>
        <Route path="/home" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
