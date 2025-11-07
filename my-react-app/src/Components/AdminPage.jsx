import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// helper to decode JWT (to check expiry and role)
function parseJwt(token) {
  try {
    const base64 = token.split(".")[1];
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export default function AdminPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = (localStorage.getItem("role") || "").toUpperCase();

    // 🧩 1. No token → go to login
    if (!token) {
      alert("Please login first.");
      navigate("/login", { replace: true });
      return;
    }

    // 🧩 2. Decode token and check expiry
    const payload = parseJwt(token);
    if (!payload || (payload.exp && Date.now() >= payload.exp * 1000)) {
      localStorage.clear();
      alert("Session expired. Please login again.");
      navigate("/login", { replace: true });
      return;
    }

    // 🧩 3. Check that role is ADMIN
    const actualRole = (payload.role || storedRole || "").toUpperCase();
    if (actualRole !== "ADMIN") {
      alert("You do not have access to this page.");
      navigate("/user", { replace: true });
    }
  }, [navigate]);

  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Admin Interface</h1>
      <p>
        Welcome, <b>{username}</b>! You are logged in as <b>{role}</b>.
      </p>

      <button
        onClick={handleLogout}
        style={{
          padding: "10px 20px",
          background: "#ff4d4d",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Logout
      </button>
    </div>
  );
}
