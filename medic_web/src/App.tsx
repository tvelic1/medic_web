import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import './App.css';
import { useState } from 'react';
import NotLoggedIn from './components/NotLoggedIn/NotLoggedIn';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') == "prijavljen");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/home" element={isLoggedIn ? <Home /> : <NotLoggedIn />} />
      </Routes>
    </Router>
  );
}

export default App;
