import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./Components/Header";
import Form from "./Components/Form";
import AdminPage from "./Components/AdminPage";
import UserPage from "./Components/UserPage";
import LoginPage from "./Components/LoginPage";
import Register from "./Components/Register";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      {/* Header and navigation */}
      {/* <Header /> */}
      <nav style={{ display: "flex", gap: "1rem", padding: "1rem", justifyContent: "center" }}>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>

      {/* Optional form at bottom */}
      {/* <Form /> */}
    </BrowserRouter>
  );
}

export default App;