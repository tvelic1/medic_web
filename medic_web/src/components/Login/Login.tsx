import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { LoginProps } from "../../interfaces/LoginProps";
import { makeRequest } from "../../axios/makeRequest";
import ErrorPopup from "../ErrorPopup/ErrorPopup";



function Login({ setIsLoggedIn }: LoginProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setLoading(true);
  
    try {const token=localStorage.getItem('jwtToken')
      const response = await makeRequest({
        method: 'POST',
        endpoint: '/login',
        data: { username, password },
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response) {
        localStorage.setItem("isLoggedIn", "prijavljen");
        setIsLoggedIn(true);
        navigate("/home");
        localStorage.setItem('jwtToken', response.token);
        //console.log(response.token)
      }
    } catch (error) {
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      if (error instanceof Error) {
        console.error("Login failed:", error.message);
        setError("Login failed: " + error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    } finally {
      setLoading(false);
    }
  };
  
  const closeModal = () => {
    setError(null);
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
            required
          />
          <i className="bx bxs-user"></i>
        </div>
        <div className="input-box">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
      {error && <ErrorPopup message={error} onClose={closeModal} />}
    </div>
  );
}

export default Login;
