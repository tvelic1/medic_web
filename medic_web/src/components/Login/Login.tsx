import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [usernameVisible, setUsernameVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-background");
    return () => {
      document.body.classList.remove("login-background");
    };
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleUsernameVisibility = () => {
    setUsernameVisible(!usernameVisible);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post('https://medic-api.vercel.app/login', 
        { username, password },
        { withCredentials: true } // Ensure credentials are sent with the request
      );
    
      if (response.status === 200) {
        navigate("/home");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Login failed:', error.response?.data || error.message);
        alert('Login failed: ' + (error.response?.data || error.message));
      } else {
        console.error('An unexpected error occurred:', error);
        alert('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>MedicLab</h1>
        <div className="input-box">
          <input
            placeholder="Username"
            type={usernameVisible ? "text" : "password"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <i className="bx bxs-user" onClick={toggleUsernameVisibility}></i>
        </div>
        <div className="input-box">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i
            className={passwordVisible ? "bx bxs-show" : "bx bxs-hide"}
            onClick={togglePasswordVisibility}
          ></i>
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? <div className="loader"></div> : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
