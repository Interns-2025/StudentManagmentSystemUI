import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/styles/comman.css";
import { registerUser } from "../api/authApi";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    role: "student",
    adminUsername: "",
    adminPassword: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Admin authentication logic (frontend check)
    if (form.role === "admin") {
      if (form.adminUsername !== "admin" || form.adminPassword !== "123456") {
        setError("Admin authentication failed");
        return;
      }
    }

    try {
      const { adminUsername, adminPassword, ...payload } = form; // remove unnecessary frontend-only fields
      await registerUser(payload);
      alert("Signup successful! Please login.");
      navigate("/"); // Navigate after successful signup
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="page-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Choose a username"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Choose a password"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
          required
        />
        <select name="role" onChange={handleChange}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="parent">Parent</option>
          <option value="admin">Admin</option>
        </select>

        {form.role === "admin" && (
          <>
            <h4>--- Admin Authentication ---</h4>
            <input
              type="text"
              name="adminUsername"
              placeholder="Enter admin username"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="adminPassword"
              placeholder="Enter admin password"
              onChange={handleChange}
              required
            />
          </>
        )}

        <button type="submit">Signup</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Signup;
