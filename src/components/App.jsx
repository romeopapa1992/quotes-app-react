import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import QuotesPanel from "./QuotesPanel";
import HomePage from "./HomePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quotes" element={<QuotesPanel />} />
      </Routes>
    </div>
  );
}

export default App;