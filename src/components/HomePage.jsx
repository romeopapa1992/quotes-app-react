import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1 className="title">Welcome to Quotes App</h1>
      <p className="description">Manage and explore your favorite quotes effortlessly!</p>
      <div className="button-group">
        <button className="button" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="button" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
}

export default HomePage;
