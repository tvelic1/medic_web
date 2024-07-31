import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";

interface LoginProps {
  setIsLoggedIn: (value: boolean) => void;
}

function Login({ setIsLoggedIn }: LoginProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://medic-api-3vyj.vercel.app/login', 
        { username, password },
        { withCredentials: true } 
      );

      if (response.status === 200) {
        // Make a request to /users to ensure session is established

        localStorage.setItem('isLoggedIn', "prijavljen");
        setIsLoggedIn(true);
        navigate("/home");
      }
    } catch (error) {
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      if (axios.isAxiosError(error)) {
        console.error('Login failed:', error.response?.data || error.message);
        //alert('Login failed: ' + (error.response?.data || error.message));
      } else {
        console.error('An unexpected error occurred:', error);
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
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <i className="bx bxs-user"></i>
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
