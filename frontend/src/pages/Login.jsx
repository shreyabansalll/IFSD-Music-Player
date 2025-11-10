import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      login(res.data.user, res.data.token);
      setMessage("Login successful!");
      navigate("/"); // redirect to home page
    } catch (err) {
      setMessage("Invalid credentials. Try again.");
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Login</h2>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center mt-4"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control w-50 mb-3"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control w-50 mb-3"
          required
        />
        <button type="submit" className="btn btn-success w-50">
          Login
        </button>
      </form>
      <p className="mt-3 text-success">{message}</p>
    </div>
  );
};

export default Login;
