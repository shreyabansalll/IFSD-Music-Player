import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-dark bg-dark p-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">🎵 Mood Player</Link>
        <div>
          {user ? (
            <>
              <span className="text-light me-3">Hi, {user.name}</span>
              <button className="btn btn-danger btn-sm" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light btn-sm me-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline-light btn-sm" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
