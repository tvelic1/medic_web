import { useNavigate } from 'react-router-dom';
import './NotLoggedIn.css';

function NotLoggedIn() {
  const navigate = useNavigate();
  return (
    <div className="not-logged-in">
      <div className="message-box">
        <h2>Access Denied</h2>
        <p>You must be logged in to access this page.</p>
        <button className="login-button" onClick={()=>{navigate('/')}}>Go to Login</button>
      </div>
    </div>
  );
}

export default NotLoggedIn;
