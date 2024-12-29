import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validateRegister } from "../validation";

function Register() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateRegister(credentials);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post("http://localhost:3000/auth/register", credentials);
      navigate("/login");
    } catch (error) {
      const status = error.response?.status;
      const message = error.response?.data?.message;

      if (status === 400 || status === 409) {
        setErrors({ email: message });
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title">Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        <div className="input-group">
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className={errors.password ? "error" : ""}
          />
          {errors.password && (
            <span className="error-text">{errors.password}</span>
          )}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

