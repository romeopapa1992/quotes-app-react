import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import QuotesPanel from "./QuotesPanel";
import HomePage from "./HomePage";
import Footer from "./Footer";
import Header from "./Header";


function App() {

  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = "/";
  };

  return (
    <div>
      {location.pathname === "/quotes" && <Header onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quotes" element={<QuotesPanel />} />
      </Routes>
      <Footer />
    </div>
  );
}


export default App;