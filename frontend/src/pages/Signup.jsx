import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/signup", {
        name,
        email,
        password,
      });
      setMessage("Signup successful! Please login.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage("Signup failed. Try again.");
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h2>Signup</h2>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column align-items-center mt-4"
      >
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control w-50 mb-3"
          required
        />
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
        <button type="submit" className="btn btn-primary w-50">
          Signup
        </button>
      </form>
      <p className="mt-3 text-success">{message}</p>
    </div>
  );
};

export default Signup;
