import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", credentials);
      const { accessToken, refreshToken } = response.data;
  
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
  
      navigate("/quotes");
    } catch (error) {
      console.error("Login failed", error.response?.data?.message || error.message);
      alert("Login failed: " + (error.response?.data?.message || "Something went wrong"));
    }
  };
  

  return (
    <div className="container">
      <h1 className="title">Login</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

