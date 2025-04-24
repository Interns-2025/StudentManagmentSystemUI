// src/components/auth/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/styles/comman.css";
import { loginUser } from "../api/authApi";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); /* stops from to reload the page */
   

    try {
      const data = await loginUser(username, password);

      if (data.role === "admin") navigate("/admin");
      else if (data.role === "teacher") navigate("/teacher");
      else if (data.role === "student") navigate("/student");
      else if (data.role === "parent") navigate("/parent");
      else setError("Unrecognized role.");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check credentials.");
    }
  };

  return (
    <div className="page-container">
      <h2>School Management System</h2>

     
      <form onSubmit={handleLogin}> {/* calls the handlelogin function */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p><a href="/forgot-password">Forgot Password?</a></p>
      <p>New user? <a href="/signup">Signup here</a></p>
    </div>
  );
};

export default Login;

