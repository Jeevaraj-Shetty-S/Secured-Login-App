import { useState } from "react";
import axios from 'axios';
import { useNavigate,Link } from "react-router-dom";
import "/Users/shreyas-r/OneDrive - HCL TECHNOLOGIES LIMITED/Desktop/ReactFrontend Practice/my-react-app/src/Components/Styles/RegisterPage.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register", {
        username,
        password,
        role,
      });
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error(error);
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h2>Create Account</h2>

      <form onSubmit={handleRegister}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <button type="submit" className="register-btn">
          Register
        </button>
      </form>

      {message && (
        <p className={`message ${message.includes("failed") ? "error" : "success"}`}>
          {message}
        </p>
      )}

      <p className="redirect-text">
        Already have an account?{" "}
        <Link to="/login" className="link">
          Login here
        </Link>
      </p>
    </div>
  );
}

export default Register;