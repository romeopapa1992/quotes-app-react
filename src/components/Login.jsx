import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateLogin } from "../services/validation";
import { login } from "../services/authService";

function Login() {
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
    const validationErrors = validateLogin(credentials);
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    try {
      await login(credentials);
      navigate("/quotes");
    } catch (error) {
      setErrors({ email: "Invalid email or password." });
    }
  };

  return (
    <div className="container">
      <h1 className="title">Login</h1>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
