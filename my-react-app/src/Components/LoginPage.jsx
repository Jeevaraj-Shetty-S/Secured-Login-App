import { useState } from "react";
import axios from 'axios';
import '/Users/shreyas-r/OneDrive - HCL TECHNOLOGIES LIMITED/Desktop/ReactFrontend Practice/my-react-app/src/Components/Styles/LoginPage.css'
import { Link, useNavigate } from "react-router-dom";


function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });

      // ✅ Wait for token and role
      const { token, role } = res.data;
      if (!token) {
        alert("No token received — check backend.");
        return;
      }

      // ✅ Save everything BEFORE navigation
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);

      setMessage("Login Successful!");

      // ✅ Small delay (ensures localStorage is written)
      setTimeout(() => {
        if (role.toUpperCase() === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      }, 200);
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Login failed!";
      setMessage(msg);
    }
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>

      <form onSubmit={handleLogin}>
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

        <button type="submit" className="login-btn">
          Login
        </button>
      </form>

      {message && <p className="message">{message}</p>}

      <p className="redirect-text">
        Don’t have an account?{" "}
        <Link to="/register" className="link">
          Register here
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;