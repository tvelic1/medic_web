import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [usernameVisible, setUsernameVisible] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/home");
    }, 2000);
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>MedicLab</h1>
        <div className="input-box">
          <input
            placeholder="Username"
            type={usernameVisible ? "text" : "password"}
          />
          <i className="bx bxs-user" onClick={toggleUsernameVisibility}></i>
        </div>
        <div className="input-box">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
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
